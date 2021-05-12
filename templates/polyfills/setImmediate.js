function setImmediate() {
  const args = Array.prototype.slice.call(arguments);
  const cb = args.splice(0, 1)[0];
  setTimeout(function () {
    cb.apply(null, args);
  }, 0);
}

module.exports = setImmediate;
