webpackHotUpdate("bundle",{

/***/ "./src/shared/pages/Movies/Movies.js":
/*!*******************************************!*\
  !*** ./src/shared/pages/Movies/Movies.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _actions = __webpack_require__(/*! actions */ "./src/shared/store/actions/index.js");

var _MovieCard = _interopRequireDefault(__webpack_require__(/*! components/MovieCard/MovieCard */ "./src/shared/components/MovieCard/MovieCard.js"));

__webpack_require__(/*! ./Movies.scss */ "./src/shared/pages/Movies/Movies.scss");

var Movies =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Movies, _Component);

  function Movies() {
    (0, _classCallCheck2.default)(this, Movies);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Movies).apply(this, arguments));
  }

  (0, _createClass2.default)(Movies, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          movies = _this$props.movies,
          fetchMovies = _this$props.fetchMovies;

      if (movies.length === 0) {
        fetchMovies('movie/popular');
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          searchTerm = _this$props2.searchTerm,
          movies = _this$props2.movies;
      return _react.default.createElement("section", null, _react.default.createElement("div", {
        className: "px-3"
      }, _react.default.createElement("div", {
        className: "d-flex align-items-start justify-content-between flex-wrap"
      }, movies.map(function (movie) {
        return _react.default.createElement(_MovieCard.default, (0, _extends2.default)({
          key: movie.id
        }, movie));
      }))));
    }
  }]);
  return Movies;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    searchTerm: state.searchTerm,
    movies: state.movies
  };
};

var mapDispatchToProps = {
  fetchMovies: _actions.getMovies,
  setSearchTerm: _actions.setSearchTerm
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Movies);

exports.default = _default;

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9idW5kbGUuM2EyZTAyNWQ1ZDliOTEyMmVkZTYuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcGFnZXMvTW92aWVzL01vdmllcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGFycmF5T2YsIHNoYXBlLCBzdHJpbmcsIG51bWJlciB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgeyBzZXRTZWFyY2hUZXJtLCBnZXRNb3ZpZXMgfSBmcm9tICdhY3Rpb25zJztcblxuaW1wb3J0IE1vdmllQ2FyZCBmcm9tICdjb21wb25lbnRzL01vdmllQ2FyZC9Nb3ZpZUNhcmQnO1xuXG5pbXBvcnQgJy4vTW92aWVzLnNjc3MnO1xuXG5jbGFzcyBNb3ZpZXMgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgbW92aWVzLCBmZXRjaE1vdmllcyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAobW92aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZmV0Y2hNb3ZpZXMoJ21vdmllL3BvcHVsYXInKTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgY29uc3QgeyBzZWFyY2hUZXJtLCBtb3ZpZXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1mbGV4IGFsaWduLWl0ZW1zLXN0YXJ0IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAge21vdmllcy5tYXAobW92aWUgPT4gKFxuICAgICAgICAgICAgICA8TW92aWVDYXJkIGtleT17bW92aWUuaWR9IHsuLi5tb3ZpZX0gLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICApO1xuXG4gIH1cblxuICBcbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiAoe1xuICBzZWFyY2hUZXJtOiBzdGF0ZS5zZWFyY2hUZXJtLFxuICBtb3ZpZXM6IHN0YXRlLm1vdmllc1xufSk7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHsgXG4gIGZldGNoTW92aWVzOiBnZXRNb3ZpZXMsXG4gIHNldFNlYXJjaFRlcm0sICBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzXG4pKE1vdmllcyk7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFFQTs7O0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBREE7QUFRQTs7O0FBOUJBO0FBQ0E7QUFrQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUFBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==