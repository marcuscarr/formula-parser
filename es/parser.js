function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Emitter from 'tiny-emitter';
import _evaluateByOperator from './evaluate-by-operator/evaluate-by-operator';
import { Parser as GrammarParser } from './grammar-parser/grammar-parser';
import { trimEdges } from './helper/string';
import { toNumber, invertNumber } from './helper/number';
import errorParser, { isValidStrict as isErrorValid, ERROR, ERROR_NAME } from './error';

/**
 * @class Parser
 */

var Parser = function (_Emitter) {
  _inherits(Parser, _Emitter);

  function Parser() {
    _classCallCheck(this, Parser);

    var _this = _possibleConstructorReturn(this, _Emitter.call(this));

    _this.parser = new GrammarParser();
    _this.parser.yy = {
      toNumber: toNumber,
      trimEdges: trimEdges,
      invertNumber: invertNumber,
      throwError: function throwError(errorName) {
        return _this._throwError(errorName);
      },
      callVariable: function callVariable(variable) {
        return _this._callVariable(variable);
      },
      evaluateByOperator: function evaluateByOperator(operator, params) {
        return _evaluateByOperator(operator, params, _this);
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


  Parser.prototype.parse = function parse(expression) {
    var result = null;
    var error = null;

    try {
      if (expression === '') {
        result = '';
      } else {
        result = this.parser.parse(expression);
      }
    } catch (ex) {
      var message = errorParser(ex.message);

      if (message) {
        error = message;
      } else {
        error = errorParser(ERROR);
      }
    }

    if (result instanceof Error) {
      error = errorParser(result.message) || errorParser(ERROR);
      result = null;
    }

    return {
      error: error,
      result: result
    };
  };

  /**
   * Set predefined variable name which can be visible while parsing formula expression.
   *
   * @param {String} name Variable name.
   * @param {*} value Variable value.
   * @returns {Parser}
   */


  Parser.prototype.setVariable = function setVariable(name, value) {
    this.variables[name] = value;

    return this;
  };

  /**
   * Get variable name.
   *
   * @param {String} name Variable name.
   * @returns {*}
   */


  Parser.prototype.getVariable = function getVariable(name) {
    return this.variables[name];
  };

  /**
   * Retrieve variable value by its name.
   *
   * @param name Variable name.
   * @returns {*}
   * @private
   */


  Parser.prototype._callVariable = function _callVariable(name) {
    var value = this.getVariable(name);

    this.emit('callVariable', name, function (newValue) {
      if (newValue !== void 0) {
        value = newValue;
      }
    });

    if (value === void 0) {
      throw Error(ERROR_NAME);
    }

    return value;
  };

  /**
   * Set custom function which can be visible while parsing formula expression.
   *
   * @param {String} name Custom function name.
   * @param {Function} fn Custom function.
   * @returns {Parser}
   */


  Parser.prototype.setFunction = function setFunction(name, fn) {
    this.functions[name] = fn;

    return this;
  };

  /**
   * Get custom function.
   *
   * @param {String} name Custom function name.
   * @returns {*}
   */


  Parser.prototype.getFunction = function getFunction(name) {
    return this.functions[name];
  };

  /**
   * Call function with provided params.
   *
   * @param name Function name.
   * @param params Function params.
   * @returns {*}
   * @private
   */


  Parser.prototype._callFunction = function _callFunction(name) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var fn = this.getFunction(name);
    var value = void 0;

    if (fn) {
      value = fn(params);
    }

    this.emit('callFunction', name, params, function (newValue) {
      if (newValue !== void 0) {
        value = newValue;
      }
    });

    return value === void 0 ? _evaluateByOperator(name, params) : value;
  };

  /**
   * Try to throw error by its name.
   *
   * @param {String} errorName Error name.
   * @returns {String}
   * @private
   */


  Parser.prototype._throwError = function _throwError(errorName) {
    if (isErrorValid(errorName)) {
      throw Error(errorName);
    }

    throw Error(ERROR);
  };

  return Parser;
}(Emitter);

export default Parser;