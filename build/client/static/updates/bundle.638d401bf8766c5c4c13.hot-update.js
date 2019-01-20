webpackHotUpdate("bundle",{

/***/ "./src/shared/components/MovieCard/MovieCard.js":
/*!******************************************************!*\
  !*** ./src/shared/components/MovieCard/MovieCard.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

__webpack_require__(/*! ./MovieCard.scss */ "./src/shared/components/MovieCard/MovieCard.scss");

var MovieCard =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MovieCard, _Component);

  function MovieCard() {
    (0, _classCallCheck2.default)(this, MovieCard);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MovieCard).apply(this, arguments));
  }

  (0, _createClass2.default)(MovieCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          movieGenre = _this$props.movieGenre,
          release_date = _this$props.release_date,
          overview = _this$props.overview,
          id = _this$props.id;
      return _react.default.createElement("article", {
        className: "movieCard"
      }, _react.default.createElement("div", {
        className: "card"
      }, _react.default.createElement("div", {
        className: "card-body"
      }, _react.default.createElement("h4", {
        className: "card-title"
      }, title), _react.default.createElement("p", {
        className: "card-text text-clamp"
      }, overview)), _react.default.createElement("ul", {
        className: "list-group list-group-flush"
      }, _react.default.createElement("li", {
        className: "list-group-item"
      }, release_date), _react.default.createElement("li", {
        className: "list-group-item"
      }, movieGenre))), _react.default.createElement(_reactRouterDom.NavLink, {
        to: "details/".concat(id)
      }, "See Details"));
    }
  }]);
  return MovieCard;
}(_react.Component);

exports.default = MovieCard;

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9idW5kbGUuNjM4ZDQwMWJmODc2NmM1YzRjMTMuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9Nb3ZpZUNhcmQvTW92aWVDYXJkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmltcG9ydCAnLi9Nb3ZpZUNhcmQuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmllQ2FyZCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgbGV0IHsgdGl0bGUsIG1vdmllR2VucmUsIHJlbGVhc2VfZGF0ZSwgb3ZlcnZpZXcsIGlkIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxhcnRpY2xlIGNsYXNzTmFtZT1cIm1vdmllQ2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImNhcmQtdGl0bGVcIj57dGl0bGV9PC9oND5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImNhcmQtdGV4dCB0ZXh0LWNsYW1wXCI+XG4gICAgICAgICAgICAgIHtvdmVydmlld31cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cCBsaXN0LWdyb3VwLWZsdXNoXCI+XG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCI+e3JlbGVhc2VfZGF0ZX08L2xpPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiPnttb3ZpZUdlbnJlfTwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPE5hdkxpbmsgdG89e2BkZXRhaWxzLyR7aWR9YH0+XG4gICAgICAgICAgU2VlIERldGFpbHNcbiAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgPC9hcnRpY2xlPlxuXG4gICAgKTtcblxuICB9XG4gIFxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFJQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFJQTtBQUFBO0FBT0E7OztBQTVCQTtBQUNBOzs7OztBIiwic291cmNlUm9vdCI6IiJ9