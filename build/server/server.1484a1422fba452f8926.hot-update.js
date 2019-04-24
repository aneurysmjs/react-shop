exports.id = "server";
exports.modules = {

/***/ "./src/shared/api/api.js":
/*!*******************************!*\
  !*** ./src/shared/api/api.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"@babel/runtime/helpers/interopRequireDefault\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _axios = _interopRequireDefault(__webpack_require__(/*! axios */ \"axios\"));\n\n/**\n * @module api/api\n */\nvar _default = _axios[\"default\"];\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/shared/api/api.js?");

/***/ }),

/***/ "./src/shared/constants/Urls.js":
/*!**************************************!*\
  !*** ./src/shared/constants/Urls.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.COUNTRIES = void 0;\nvar COUNTRIES = 'https://restcountries.eu/rest/v2';\nexports.COUNTRIES = COUNTRIES;\n\n//# sourceURL=webpack:///./src/shared/constants/Urls.js?");

/***/ }),

/***/ "./src/shared/pages/Home/Home.js":
/*!***************************************!*\
  !*** ./src/shared/pages/Home/Home.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"@babel/runtime/helpers/interopRequireWildcard\");\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"@babel/runtime/helpers/interopRequireDefault\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\"));\n\nvar _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\"));\n\nvar _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"@babel/runtime/helpers/possibleConstructorReturn\"));\n\nvar _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"@babel/runtime/helpers/getPrototypeOf\"));\n\nvar _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"@babel/runtime/helpers/assertThisInitialized\"));\n\nvar _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ \"@babel/runtime/helpers/inherits\"));\n\nvar _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\"));\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _Urls = __webpack_require__(/*! constants/Urls */ \"./src/shared/constants/Urls.js\");\n\nvar _actions = __webpack_require__(/*! actions */ \"./src/shared/store/actions/index.js\");\n\n__webpack_require__(/*! ./Home.scss */ \"./src/shared/pages/Home/Home.scss\");\n\nvar Home =\n/*#__PURE__*/\nfunction (_Component) {\n  (0, _inherits2[\"default\"])(Home, _Component);\n\n  function Home() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    (0, _classCallCheck2[\"default\"])(this, Home);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = (0, _possibleConstructorReturn2[\"default\"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3[\"default\"])(Home)).call.apply(_getPrototypeOf2, [this].concat(args)));\n    (0, _defineProperty2[\"default\"])((0, _assertThisInitialized2[\"default\"])(_this), \"handleChange\", function (evt) {\n      var setSelectedCountry = _this.props.setSelectedCountry;\n      var selectedCountry = evt.target.value;\n      setSelectedCountry(selectedCountry);\n    });\n    return _this;\n  }\n\n  (0, _createClass2[\"default\"])(Home, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this$props = this.props,\n          countries = _this$props.countries,\n          getCountries = _this$props.getCountries;\n\n      if (!countries.length) {\n        getCountries(\"\".concat(_Urls.COUNTRIES, \"/all\"));\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this$props2 = this.props,\n          selectedCountry = _this$props2.selectedCountry,\n          countries = _this$props2.countries;\n      return _react[\"default\"].createElement(\"div\", {\n        className: \"Home d-flex flex-column align-items-center justify-content-center\"\n      }, _react[\"default\"].createElement(\"h1\", null, \"Shop\"), _react[\"default\"].createElement(\"form\", {\n        className: \"text-center col-md-4\"\n      }, _react[\"default\"].createElement(\"div\", {\n        className: \"form-group\"\n      }, _react[\"default\"].createElement(\"label\", {\n        htmlFor: \"countries\"\n      }, \"Select a Country\"), _react[\"default\"].createElement(\"select\", {\n        value: selectedCountry,\n        className: \"form-control\",\n        onChange: this.handleChange\n      }, countries.map(function (_ref) {\n        var name = _ref.name;\n        return _react[\"default\"].createElement(\"option\", {\n          id: \"countries\",\n          key: name,\n          value: name\n        }, name);\n      })))), _react[\"default\"].createElement(_reactRouterDom.Link, {\n        to: \"products\"\n      }, _react[\"default\"].createElement(\"button\", {\n        type: \"button\",\n        className: \"btn btn-primary\"\n      }, \"All products\")));\n    }\n  }]);\n  return Home;\n}(_react.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    selectedCountry: state.selectedCountry,\n    countries: state.countries\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    getCountries: function getCountries(url) {\n      dispatch((0, _actions.getCountries)(url));\n    },\n    setCountry: function setCountry(country) {\n      dispatch((0, _actions.setSelectedCountry)(country));\n    }\n  };\n};\n\nvar _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Home);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/shared/pages/Home/Home.js?");

/***/ }),

/***/ "./src/shared/pages/Home/Home.scss":
/*!*****************************************!*\
  !*** ./src/shared/pages/Home/Home.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".Home {\\n  height: calc(100vh - 181px); }\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/shared/pages/Home/Home.scss?");

/***/ }),

/***/ "./src/shared/store/actions/getCountries.js":
/*!**************************************************!*\
  !*** ./src/shared/store/actions/getCountries.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"@babel/runtime/helpers/interopRequireWildcard\");\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"@babel/runtime/helpers/interopRequireDefault\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = getCountries;\n\nvar _api = _interopRequireDefault(__webpack_require__(/*! api */ \"./src/shared/api/api.js\"));\n\nvar types = _interopRequireWildcard(__webpack_require__(/*! ../ActionTypes */ \"./src/shared/store/ActionTypes.js\"));\n\n//  strict\nfunction getCountries() {\n  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n  return {\n    types: [types.GET_COUNTRIES_REQUEST, types.GET_COUNTRIES_SUCCESS, types.GET_COUNTRIES_FAILURE],\n    callAPI: function callAPI() {\n      return _api[\"default\"].get(query);\n    }\n  };\n}\n\n//# sourceURL=webpack:///./src/shared/store/actions/getCountries.js?");

/***/ }),

/***/ "./src/shared/store/actions/index.js":
/*!*******************************************!*\
  !*** ./src/shared/store/actions/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"@babel/runtime/helpers/interopRequireDefault\");\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"@babel/runtime/helpers/interopRequireWildcard\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nObject.defineProperty(exports, \"getCountries\", {\n  enumerable: true,\n  get: function get() {\n    return _getCountries[\"default\"];\n  }\n});\nexports.setSelectedCountry = void 0;\n\nvar types = _interopRequireWildcard(__webpack_require__(/*! ../ActionTypes */ \"./src/shared/store/ActionTypes.js\"));\n\nvar _makeActionCreator = _interopRequireDefault(__webpack_require__(/*! ./makeActionCreator */ \"./src/shared/store/actions/makeActionCreator.js\"));\n\nvar _getCountries = _interopRequireDefault(__webpack_require__(/*! ./getCountries */ \"./src/shared/store/actions/getCountries.js\"));\n\n/**\n * @module reducers\n */\n\n/**\n *\n * @param {String} selectedCountry\n * @return {Object.<Action>} action\n */\nvar setSelectedCountry = (0, _makeActionCreator[\"default\"])(types.SET_SELECTED_COUNTRY, 'selectedCountry');\nexports.setSelectedCountry = setSelectedCountry;\n\n//# sourceURL=webpack:///./src/shared/store/actions/index.js?");

/***/ }),

/***/ "./src/shared/store/actions/makeActionCreator.js":
/*!*******************************************************!*\
  !*** ./src/shared/store/actions/makeActionCreator.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = makeActionCreator;\n\n/**\n * @module actions/makeActionCreator\n */\n\n/**\n * Makes an action creator function to reduce boilerplate\n *\n * @param {String} type\n * @param argNames\n * @return {Function} the action creator itself\n */\nfunction makeActionCreator(type) {\n  for (var _len = arguments.length, argNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n    argNames[_key - 1] = arguments[_key];\n  }\n\n  return function () {\n    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n      args[_key2] = arguments[_key2];\n    }\n\n    var action = {\n      type: type\n    };\n    argNames.forEach(function (arg, index) {\n      action[argNames[index]] = args[index];\n    });\n    return action;\n  };\n}\n\n//# sourceURL=webpack:///./src/shared/store/actions/makeActionCreator.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ })

};