"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.__esModule = true;
exports["default"] = void 0;

var _tinyEmitter = _interopRequireDefault(require("tiny-emitter"));

var _evaluateByOperator2 = _interopRequireDefault(require("./evaluate-by-operator/evaluate-by-operator"));

var _grammarParser = require("./grammar-parser/grammar-parser");

var _string = require("./helper/string");

var _number = require("./helper/number");

var _error = _interopRequireWildcard(require("./error"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @class Parser
 */
var Parser =
/*#__PURE__*/
function (_Emitter) {
  _inheritsLoose(Parser, _Emitter);

  function Parser() {
    var _this;

    _this = _Emitter.call(this) || this;
    _this.parser = new _grammarParser.Parser();
    _this.parser.yy = {
      toNumber: _number.toNumber,
      trimEdges: _string.trimEdges,
      invertNumber: _number.invertNumber,
      throwError: function throwError(errorName) {
        return _this._throwError(errorName);
      },
      callVariable: function callVariable(variable) {
        return _this._callVariable(variable);
      },
      evaluateByOperator: function evaluateByOperator(operator, params) {
        return (0, _evaluateByOperator2["default"])(operator, params, _assertThisInitialized(_this));
      },
      callFunction: function callFunction(name, params) {
        return _this._callFunction(name, params);
      }
    };
    _this.variables = Object.create(null);
    _this.functions = Object.create(null);

    _this.setVariable('TRUE', true).setVariable('FALSE', false).setVariable('NULL', null);

    return _this;
  }
  /**
   * Parse formula expression.
   *
   * @param {String} expression to parse.
   * @return {*} Returns an object with tow properties `error` and `result`.
   */


  var _proto = Parser.prototype;

  _proto.parse = function parse(expression) {
    var result = null;
    var error = null;

    try {
      if (expression === '') {
        result = '';
      } else {
        result = this.parser.parse(expression);
      }
    } catch (ex) {
      var message = (0, _error["default"])(ex.message);

      if (message) {
        error = message;
      } else {
        error = (0, _error["default"])(_error.ERROR);
      }
    }

    if (result instanceof Error) {
      error = (0, _error["default"])(result.message) || (0, _error["default"])(_error.ERROR);
      result = null;
    }

    return {
      error: error,
      result: result
    };
  }
  /**
   * Set predefined variable name which can be visible while parsing formula expression.
   *
   * @param {String} name Variable name.
   * @param {*} value Variable value.
   * @returns {Parser}
   */
  ;

  _proto.setVariable = function setVariable(name, value) {
    this.variables[name] = value;
    return this;
  }
  /**
   * Get variable name.
   *
   * @param {String} name Variable name.
   * @returns {*}
   */
  ;

  _proto.getVariable = function getVariable(name) {
    return this.variables[name];
  }
  /**
   * Retrieve variable value by its name.
   *
   * @param name Variable name.
   * @returns {*}
   * @private
   */
  ;

  _proto._callVariable = function _callVariable(name) {
    var value = this.getVariable(name);
    this.emit('callVariable', name, function (newValue) {
      if (newValue !== void 0) {
        value = newValue;
      }
    });

    if (value === void 0) {
      throw Error(_error.ERROR_NAME);
    }

    return value;
  }
  /**
   * Set custom function which can be visible while parsing formula expression.
   *
   * @param {String} name Custom function name.
   * @param {Function} fn Custom function.
   * @returns {Parser}
   */
  ;

  _proto.setFunction = function setFunction(name, fn) {
    this.functions[name] = fn;
    return this;
  }
  /**
   * Get custom function.
   *
   * @param {String} name Custom function name.
   * @returns {*}
   */
  ;

  _proto.getFunction = function getFunction(name) {
    return this.functions[name];
  }
  /**
   * Call function with provided params.
   *
   * @param name Function name.
   * @param params Function params.
   * @returns {*}
   * @private
   */
  ;

  _proto._callFunction = function _callFunction(name) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var fn = this.getFunction(name);
    var value;

    if (fn) {
      value = fn(params);
    }

    this.emit('callFunction', name, params, function (newValue) {
      if (newValue !== void 0) {
        value = newValue;
      }
    });
    return value === void 0 ? (0, _evaluateByOperator2["default"])(name, params) : value;
  }
  /**
   * Try to throw error by its name.
   *
   * @param {String} errorName Error name.
   * @returns {String}
   * @private
   */
  ;

  _proto._throwError = function _throwError(errorName) {
    if ((0, _error.isValidStrict)(errorName)) {
      throw Error(errorName);
    }

    throw Error(_error.ERROR);
  };

  return Parser;
}(_tinyEmitter["default"]);

var _default = Parser;
exports["default"] = _default;