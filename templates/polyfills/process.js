const hrtime = require("browser-hrtime");

const process = {
  hrtime,
  __FAKE_PROCESS__: true,
  version: "16.15.1",
  nextTick: function (cb) {
    setTimeout(cb, 0);
  },
  env: {},
  stderr: {
    fd: 2,
  },
};

// monkey patch Object.prototype.toString
const originalToString = Object.prototype.toString;
Object.prototype.toString = function () {
  if (this.__FAKE_PROCESS__) {
    // some libraries (e.g., axios) do a check like Object.prototype.toString.call(process) === '[object process]'
    // in order to determine if the library is running in node or a browser
    // we want these libraries to think they're running in node so that they use node built-ins (e.g., http) which get polyfilled by us
    return "[object process]";
  }
  return originalToString.call(this);
};

module.exports = process;
