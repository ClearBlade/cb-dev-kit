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

Object.defineProperty(Float32Array.prototype, Symbol.toStringTag, {
  configurable: false,
  enumerable: false,
  get: function get() {
    return "Float32Array";
  },
});

Object.defineProperty(Float64Array.prototype, Symbol.toStringTag, {
  configurable: false,
  enumerable: false,
  get: function get() {
    return "Float64Array";
  },
});

Object.defineProperty(Int16Array.prototype, Symbol.toStringTag, {
  configurable: false,
  enumerable: false,
  get: function get() {
    return "Int16Array";
  },
});

Object.defineProperty(Int32Array.prototype, Symbol.toStringTag, {
  configurable: false,
  enumerable: false,
  get: function get() {
    return "Int32Array";
  },
});

Object.defineProperty(Int8Array.prototype, Symbol.toStringTag, {
  configurable: false,
  enumerable: false,
  get: function get() {
    return "Int8Array";
  },
});

Object.defineProperty(Uint16Array.prototype, Symbol.toStringTag, {
  configurable: false,
  enumerable: false,
  get: function get() {
    return "Uint16Array";
  },
});

Object.defineProperty(Uint32Array.prototype, Symbol.toStringTag, {
  configurable: false,
  enumerable: false,
  get: function get() {
    return "Uint32Array";
  },
});

Object.defineProperty(Uint8Array.prototype, Symbol.toStringTag, {
  configurable: false,
  enumerable: false,
  get: function get() {
    return "Uint8Array";
  },
});

Object.defineProperty(Uint8ClampedArray.prototype, Symbol.toStringTag, {
  configurable: false,
  enumerable: false,
  get: function get() {
    return "Uint8ClampedArray";
  },
});
