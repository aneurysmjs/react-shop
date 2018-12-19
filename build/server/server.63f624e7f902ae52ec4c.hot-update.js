exports.id = "server";
exports.modules = {

/***/ "./src/shared/pages/Movies/Movies.js":
/*!*******************************************!*\
  !*** ./src/shared/pages/Movies/Movies.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"@babel/runtime/helpers/interopRequireWildcard\");\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"@babel/runtime/helpers/interopRequireDefault\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"@babel/runtime/helpers/extends\"));\n\nvar _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\"));\n\nvar _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\"));\n\nvar _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"@babel/runtime/helpers/possibleConstructorReturn\"));\n\nvar _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"@babel/runtime/helpers/getPrototypeOf\"));\n\nvar _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ \"@babel/runtime/helpers/inherits\"));\n\nvar _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"@babel/runtime/helpers/assertThisInitialized\"));\n\nvar _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\"));\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"prop-types\");\n\nvar _actions = __webpack_require__(/*! ../../actions */ \"./src/shared/actions/index.js\");\n\nvar _Nav = _interopRequireDefault(__webpack_require__(/*! components/Nav/Nav */ \"./src/shared/components/Nav/Nav.js\"));\n\nvar _MovieCard = _interopRequireDefault(__webpack_require__(/*! components/MovieCard/MovieCard */ \"./src/shared/components/MovieCard/MovieCard.js\"));\n\n__webpack_require__(/*! ./Movies.scss */ \"./src/shared/pages/Movies/Movies.scss\");\n\nvar Movies =\n/*#__PURE__*/\nfunction (_Component) {\n  (0, _inherits2.default)(Movies, _Component);\n\n  function Movies() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    (0, _classCallCheck2.default)(this, Movies);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Movies)).call.apply(_getPrototypeOf2, [this].concat(args)));\n    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), \"searchTermHandler\", function (searchTerm) {\n      _this.props.setSearchTerm(searchTerm);\n    });\n    return _this;\n  }\n\n  (0, _createClass2.default)(Movies, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      console.log('this.props', this.props);\n\n      if (this.props.movies.length === 0) {}\n    }\n  }, {\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate() {}\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this$props = this.props,\n          searchTerm = _this$props.searchTerm,\n          movies = _this$props.movies;\n      return _react.default.createElement(\"section\", null, _react.default.createElement(_Nav.default, {\n        showSearch: true,\n        searchTerm: searchTerm,\n        onSearch: this.searchTermHandler\n      }), _react.default.createElement(\"div\", {\n        className: \"px-3\"\n      }, _react.default.createElement(\"div\", {\n        className: \"d-flex align-items-start justify-content-between flex-wrap\"\n      }, movies.filter(function (movie) {\n        return \"\".concat(movie.movieTitle, \" \").concat(movie.description).toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0;\n      }).map(function (movie) {\n        return _react.default.createElement(_MovieCard.default, (0, _extends2.default)({\n          key: movie.id\n        }, movie));\n      }))));\n    }\n  }]);\n  return Movies;\n}(_react.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    searchTerm: state.searchTerm,\n    movies: state.movies\n  };\n};\n\nvar mapDispatchToProps = {\n  getMovies: _actions.getMovies,\n  setSearchTerm: _actions.setSearchTerm\n};\n\nvar _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Movies);\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/shared/pages/Movies/Movies.js?");

/***/ })

};