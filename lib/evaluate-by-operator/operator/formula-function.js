"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.__esModule = true;
exports["default"] = func;
exports.SYMBOL = void 0;

var formulajs = _interopRequireWildcard(require("@handsontable/formulajs"));

var _supportedFormulas = _interopRequireDefault(require("./../../supported-formulas"));

var _error = require("./../../error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SYMBOL = _supportedFormulas["default"];
exports.SYMBOL = SYMBOL;

function func(symbol) {
  return function __formulaFunction() {
    symbol = symbol.toUpperCase();
    var symbolParts = symbol.split('.');
    var foundFormula = false;
    var result;

    if (symbolParts.length === 1) {
      if (formulajs[symbolParts[0]]) {
        foundFormula = true;
        result = formulajs[symbolParts[0]].apply(formulajs, arguments);
      }
    } else {
      var length = symbolParts.length;
      var index = 0;
      var nestedFormula = formulajs;

      while (index < length) {
        nestedFormula = nestedFormula[symbolParts[index]];
        index++;

        if (!nestedFormula) {
          nestedFormula = null;
          break;
        }
      }

      if (nestedFormula) {
        foundFormula = true;
        result = nestedFormula.apply(undefined, arguments);
      }
    }

    if (!foundFormula) {
      throw Error(_error.ERROR_NAME);
    }

    return result;
  };
}

func.isFactory = true;
func.SYMBOL = SYMBOL;