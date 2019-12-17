"use strict";

exports.__esModule = true;
exports["default"] = evaluateByOperator;
exports.registerOperation = registerOperation;

var _add = _interopRequireDefault(require("./operator/add"));

var _ampersand = _interopRequireDefault(require("./operator/ampersand"));

var _divide = _interopRequireDefault(require("./operator/divide"));

var _equal = _interopRequireDefault(require("./operator/equal"));

var _formulaFunction = _interopRequireDefault(require("./operator/formula-function"));

var _greaterThan = _interopRequireDefault(require("./operator/greater-than"));

var _greaterThanOrEqual = _interopRequireDefault(require("./operator/greater-than-or-equal"));

var _lessThan = _interopRequireDefault(require("./operator/less-than"));

var _lessThanOrEqual = _interopRequireDefault(require("./operator/less-than-or-equal"));

var _minus = _interopRequireDefault(require("./operator/minus"));

var _multiply = _interopRequireDefault(require("./operator/multiply"));

var _notEqual = _interopRequireDefault(require("./operator/not-equal"));

var _power = _interopRequireDefault(require("./operator/power"));

var _error = require("./../error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/no-named-as-default-member */
var availableOperators = Object.create(null);
/**
 * Evaluate values by operator id.git
 *
 * @param {String} operator Operator id.
 * @param {Array} [params=[]] Arguments to evaluate.
 * @returns {*}
 */

function evaluateByOperator(operator) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var emitter = arguments[2];
  operator = operator.toUpperCase();

  if (!availableOperators[operator]) {
    throw Error(_error.ERROR_NAME);
  }

  var value;

  try {
    value = availableOperators[operator].apply(availableOperators, params);

    if (emitter) {
      emitter.emit('callFunction', operator, params, function (newValue) {
        if (newValue !== void 0) {
          value = newValue;
        }
      });
    }
  } catch (e) {
    if (emitter) {
      emitter.emit('functionError', operator, params, function (newValue) {
        if (newValue !== void 0) {
          value = newValue;
        }
      });

      if (value === void 0) {
        return e;
      }
    } else {
      return e;
    }
  }

  return value;
}
/**
 * Register operator.
 *
 * @param {String|Array} symbol Symbol to register.
 * @param {Function} func Logic to register for this symbol.
 */


function registerOperation(symbol, func) {
  if (!Array.isArray(symbol)) {
    symbol = [symbol.toUpperCase()];
  }

  symbol.forEach(function (s) {
    if (func.isFactory) {
      availableOperators[s] = func(s);
    } else {
      availableOperators[s] = func;
    }
  });
}

registerOperation(_add["default"].SYMBOL, _add["default"]);
registerOperation(_ampersand["default"].SYMBOL, _ampersand["default"]);
registerOperation(_divide["default"].SYMBOL, _divide["default"]);
registerOperation(_equal["default"].SYMBOL, _equal["default"]);
registerOperation(_power["default"].SYMBOL, _power["default"]);
registerOperation(_formulaFunction["default"].SYMBOL, _formulaFunction["default"]);
registerOperation(_greaterThan["default"].SYMBOL, _greaterThan["default"]);
registerOperation(_greaterThanOrEqual["default"].SYMBOL, _greaterThanOrEqual["default"]);
registerOperation(_lessThan["default"].SYMBOL, _lessThan["default"]);
registerOperation(_lessThanOrEqual["default"].SYMBOL, _lessThanOrEqual["default"]);
registerOperation(_multiply["default"].SYMBOL, _multiply["default"]);
registerOperation(_notEqual["default"].SYMBOL, _notEqual["default"]);
registerOperation(_minus["default"].SYMBOL, _minus["default"]);