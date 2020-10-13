const process = {
  version: "v0.10",
  nextTick: function (cb) {
    setTimeout(cb, 0);
  },
};

module.exports = process;
