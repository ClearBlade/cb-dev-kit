import capability from './capability.js';
import inherits from 'inherits';
import response from './response.js';
import stream from 'readable-stream';

var IncomingMessage = response.IncomingMessage;
var rStates = response.readyStates;

function decideMode(preferBinary, useFetch) {
  if (capability.fetch && useFetch) {
    return "fetch";
  } else if (capability.mozchunkedarraybuffer) {
    return "moz-chunked-arraybuffer";
  } else if (capability.msstream) {
    return "ms-stream";
  } else if (capability.arraybuffer && preferBinary) {
    return "arraybuffer";
  } else {
    return "text";
  }
}

var ClientRequest = (module.exports = function (opts) {
  var self = this;
  stream.Writable.call(self);

  self._opts = opts;
  self._body = [];
  self._headers = {};
  if (opts.auth)
    self.setHeader(
      "Authorization",
      "Basic " + Buffer.from(opts.auth).toString("base64")
    );
  Object.keys(opts.headers).forEach(function (name) {
    self.setHeader(name, opts.headers[name]);
  });

  var preferBinary;
  var useFetch = true;
  if (
    opts.mode === "disable-fetch" ||
    ("requestTimeout" in opts && !capability.abortController)
  ) {
    // If the use of XHR should be preferred. Not typically needed.
    useFetch = false;
    preferBinary = true;
  } else if (opts.mode === "prefer-streaming") {
    // If streaming is a high priority but binary compatibility and
    // the accuracy of the 'content-type' header aren't
    preferBinary = false;
  } else if (opts.mode === "allow-wrong-content-type") {
    // If streaming is more important than preserving the 'content-type' header
    preferBinary = !capability.overrideMimeType;
  } else if (
    !opts.mode ||
    opts.mode === "default" ||
    opts.mode === "prefer-fast"
  ) {
    // Use binary if text streaming may corrupt data or the content-type header, or for speed
    preferBinary = true;
  } else {
    throw new Error("Invalid value for opts.mode");
  }

  self._mode = decideMode(preferBinary, useFetch);
  self._fetchTimer = null;

  self.on("finish", function () {
    self._onFinish();
  });

  setTimeout(function () {
    self.emit("socket", {});
  }, 0);
});

inherits(ClientRequest, stream.Writable);

ClientRequest.prototype.setHeader = function (name, value) {
  var self = this;
  var lowerName = name.toLowerCase();
  // This check is not necessary, but it prevents warnings from browsers about setting unsafe
  // headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
  // http-browserify did it, so I will too.
  if (unsafeHeaders.indexOf(lowerName) !== -1) return;

  self._headers[lowerName] = {
    name: name,
    value: value,
  };
};

ClientRequest.prototype.getHeader = function (name) {
  var header = this._headers[name.toLowerCase()];
  if (header) return header.value;
  return null;
};

ClientRequest.prototype.removeHeader = function (name) {
  var self = this;
  delete self._headers[name.toLowerCase()];
};

function getClearBladeHttpMethod(nodeHttpMethod) {
  switch (nodeHttpMethod) {
    case "POST":
      return "post";
    case "PUT":
      return "put";
    case "DELETE":
      return "delete";
    case "GET":
    default:
      return "get";
  }
}

function createClearBladeHttpOptions(nodeOptions, body) {
  const opts = {
    full: true,
  };
  if (nodeOptions.url) {
    opts.uri = nodeOptions.url;
  }
  if (nodeOptions.headers) {
    opts.headers = nodeOptions.headers;
  }
  if (body) {
    opts.body = body;
  }
  if (nodeOptions.auth) {
    const splitAuth = nodeOptions.auth.split(":");
    opts.auth = {
      user: splitAuth[0],
      pass: splitAuth[1],
    };
  }
  return opts;
}

ClientRequest.prototype._onFinish = function () {
  var self = this;

  if (self._destroyed) return;
  var opts = self._opts;
  var headersObj = self._headers;
  var body = null;
  if (opts.method !== "GET" && opts.method !== "HEAD") {
    body = "";
    self._body.forEach(function (buf) {
      body += buf.toString();
    });
    // body = new Blob(self._body, {
    //   type: (headersObj["content-type"] || {}).value || "",
    // });
  }

  // create flattened list of headers
  var headersList = [];
  Object.keys(headersObj).forEach(function (keyName) {
    var name = headersObj[keyName].name;
    var value = headersObj[keyName].value;
    if (Array.isArray(value)) {
      value.forEach(function (v) {
        headersList.push([name, v]);
      });
    } else {
      headersList.push([name, value]);
    }
  });

  const requestObject = Requests();
  const cbOptions = createClearBladeHttpOptions(opts, body);
  requestObject[getClearBladeHttpMethod(opts.method)](
    cbOptions,
    function (err, data) {
      if (err) {
        process.nextTick(function () {
          self.emit("error", err);
        });
      } else {
        try {
          const fdata = JSON.parse(data);
          self._xhr = {
            getAllResponseHeaders: function getAllResponseHeaders() {
              return JSON.stringify(fdata.Header);
            },
            status: fdata.Status,
          };
          self._onXHRProgress(fdata.Body);
        } catch (e) {
          console.log("failed to parse http response", e.stack);
          self._xhr = {
            getAllResponseHeaders: function getAllResponseHeaders() {
              return "";
            },
          };
          self._onXHRProgress(data);
        }
      }
    }
  );
};

/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */
function statusValid(xhr) {
  try {
    var status = xhr.status;
    return status !== null && status !== 0;
  } catch (e) {
    return false;
  }
}
// todo: is this necessary?
ClientRequest.prototype._onXHRProgress = function (data) {
  var self = this;

  // if (!statusValid(self._xhr) || self._destroyed) return;

  if (!self._response) self._connect();

  self._response._onXHRProgress(data);
};

ClientRequest.prototype._connect = function () {
  var self = this;

  if (self._destroyed) return;

  self._response = new IncomingMessage(
    self._xhr,
    self._fetchResponse,
    self._mode,
    self._fetchTimer
  );

  self._response.on("error", function (err) {
    self.emit("error", err);
  });

  self.emit("response", self._response);
};

ClientRequest.prototype._write = function (chunk, encoding, cb) {
  var self = this;

  self._body.push(chunk);
  cb();
};

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function () {
  var self = this;
  self._destroyed = true;
  global.clearTimeout(self._fetchTimer);
  if (self._response) self._response._destroyed = true;
  if (self._xhr) self._xhr.abort();
  else if (self._fetchAbortController) self._fetchAbortController.abort();
};

ClientRequest.prototype.end = function (data, encoding, cb) {
  var self = this;
  if (typeof data === "function") {
    cb = data;
    data = undefined;
  }

  stream.Writable.prototype.end.call(self, data, encoding, cb);
};

ClientRequest.prototype.flushHeaders = function () {};
ClientRequest.prototype.setTimeout = function () {};
ClientRequest.prototype.setNoDelay = function () {};
ClientRequest.prototype.setSocketKeepAlive = function () {};

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
  "accept-charset",
  "accept-encoding",
  "access-control-request-headers",
  "access-control-request-method",
  "connection",
  "content-length",
  "cookie",
  "cookie2",
  "date",
  "dnt",
  "expect",
  "host",
  "keep-alive",
  "origin",
  "referer",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "via",
];
