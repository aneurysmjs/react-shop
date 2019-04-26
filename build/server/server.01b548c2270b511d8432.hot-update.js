exports.id = "server";
exports.modules = {

/***/ "./src/shared/store/reducers/index.js":
/*!********************************************!*\
  !*** ./src/shared/store/reducers/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"@babel/runtime/helpers/interopRequireDefault\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _products = _interopRequireDefault(__webpack_require__(/*! ./products */ \"./src/shared/store/reducers/products.js\"));\n\n/**\n * @module reducers\n */\nvar _default = (0, _redux.combineReducers)({\n  products: _products[\"default\"]\n});\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/shared/store/reducers/index.js?");

/***/ })

};