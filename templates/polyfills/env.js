// env.js
Array.prototype.includes = function (val) {
  return this.indexOf(val) > -1;
};
Number.isInteger =
  Number.isInteger ||
  function (value) {
    return (
      typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  };

Reflect.construct = null;
