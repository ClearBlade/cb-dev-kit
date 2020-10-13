var ClientRequest = require("./lib/request");
var response = require("./lib/response");
var extend = require("xtend");
var statusCodes = require("builtin-status-codes");
var url = require("url");

var http = exports;

http.request = function (opts, cb) {
  console.log("http request!", opts, typeof cb);
  if (typeof opts === "string") opts = url.parse(opts);
  else opts = extend(opts);

  var protocol = opts.protocol || "https:";
  var host = opts.hostname || opts.host;
  var port = opts.port;
  var path = opts.path || "/";

  // Necessary for IPv6 addresses
  if (host && host.indexOf(":") !== -1) host = "[" + host + "]";
  console.log("http.request::1");

  // This may be a relative url. The browser should always be able to interpret it correctly.
  opts.url =
    (host ? protocol + "//" + host : "") + (port ? ":" + port : "") + path;
  opts.method = (opts.method || "GET").toUpperCase();
  opts.headers = opts.headers || {};
  console.log("http.request::2");

  // Also valid opts.auth, opts.mode

  var req = new ClientRequest(opts);
  console.log("http.request::3");
  if (cb) req.on("response", cb);
  return req;
};

http.get = function get(opts, cb) {
  var req = http.request(opts, cb);
  req.end();
  return req;
};

http.ClientRequest = ClientRequest;
http.IncomingMessage = response.IncomingMessage;

http.Agent = function () {};
http.Agent.defaultMaxSockets = 4;

http.globalAgent = new http.Agent();

http.STATUS_CODES = statusCodes;

http.METHODS = [
  "CHECKOUT",
  "CONNECT",
  "COPY",
  "DELETE",
  "GET",
  "HEAD",
  "LOCK",
  "M-SEARCH",
  "MERGE",
  "MKACTIVITY",
  "MKCOL",
  "MOVE",
  "NOTIFY",
  "OPTIONS",
  "PATCH",
  "POST",
  "PROPFIND",
  "PROPPATCH",
  "PURGE",
  "PUT",
  "REPORT",
  "SEARCH",
  "SUBSCRIBE",
  "TRACE",
  "UNLOCK",
  "UNSUBSCRIBE",
];
