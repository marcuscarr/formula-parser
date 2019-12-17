"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = func;
exports.SYMBOL = void 0;
var SYMBOL = '<=';
exports.SYMBOL = SYMBOL;

function func(exp1, exp2) {
  return exp1 <= exp2;
}

func.SYMBOL = SYMBOL;