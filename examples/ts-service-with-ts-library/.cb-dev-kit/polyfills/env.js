import getRandomValues from "polyfill-crypto.getrandomvalues";

global.crypto = { getRandomValues };

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
Array.prototype[Symbol.iterator] = Array.prototype.values;

String.prototype[Symbol.iterator] = function () {
  var ary = this.split("");
  var nextIndex = 0;
  var k = ary.length;
  var a = [];

  while (k > 0) a[--k] = ary[k];
  a.next = function () {
    return nextIndex < ary.length
      ? { value: ary[nextIndex++], done: false }
      : { done: true };
  };
  return a;
};
Float32Array.prototype[Symbol.toStringTag] = "Float32Array";
Float64Array.prototype[Symbol.toStringTag] = "Float64Array";
Int16Array.prototype[Symbol.toStringTag] = "Int16Array";
Int32Array.prototype[Symbol.toStringTag] = "Int32Array";
Int8Array.prototype[Symbol.toStringTag] = "Int8Array";
Uint16Array.prototype[Symbol.toStringTag] = "Uint16Array";
Uint32Array.prototype[Symbol.toStringTag] = "Uint32Array";
Uint8Array.prototype[Symbol.toStringTag] = "Uint8Array";
Uint8ClampedArray.prototype[Symbol.toStringTag] = "Uint8ClampedArray";
