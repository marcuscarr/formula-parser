"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Parser", {
  enumerable: true,
  get: function get() {
    return _parser["default"];
  }
});
Object.defineProperty(exports, "SUPPORTED_FORMULAS", {
  enumerable: true,
  get: function get() {
    return _supportedFormulas["default"];
  }
});
Object.defineProperty(exports, "error", {
  enumerable: true,
  get: function get() {
    return _error["default"];
  }
});
Object.defineProperty(exports, "ERROR", {
  enumerable: true,
  get: function get() {
    return _error.ERROR;
  }
});
Object.defineProperty(exports, "ERROR_DIV_ZERO", {
  enumerable: true,
  get: function get() {
    return _error.ERROR_DIV_ZERO;
  }
});
Object.defineProperty(exports, "ERROR_NAME", {
  enumerable: true,
  get: function get() {
    return _error.ERROR_NAME;
  }
});
Object.defineProperty(exports, "ERROR_NOT_AVAILABLE", {
  enumerable: true,
  get: function get() {
    return _error.ERROR_NOT_AVAILABLE;
  }
});
Object.defineProperty(exports, "ERROR_NULL", {
  enumerable: true,
  get: function get() {
    return _error.ERROR_NULL;
  }
});
Object.defineProperty(exports, "ERROR_NUM", {
  enumerable: true,
  get: function get() {
    return _error.ERROR_NUM;
  }
});
Object.defineProperty(exports, "ERROR_REF", {
  enumerable: true,
  get: function get() {
    return _error.ERROR_REF;
  }
});
Object.defineProperty(exports, "ERROR_VALUE", {
  enumerable: true,
  get: function get() {
    return _error.ERROR_VALUE;
  }
});

var _parser = _interopRequireDefault(require("./parser"));

var _supportedFormulas = _interopRequireDefault(require("./supported-formulas"));

var _error = _interopRequireWildcard(require("./error"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }