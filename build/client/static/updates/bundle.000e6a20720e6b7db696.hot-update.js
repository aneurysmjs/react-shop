webpackHotUpdate("bundle",{

/***/ "./src/shared/pages/Home/Home.js":
/*!***************************************!*\
  !*** ./src/shared/pages/Home/Home.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _actions = __webpack_require__(/*! @/store/actions */ "./src/shared/store/actions/index.js");

__webpack_require__(/*! ./Home.scss */ "./src/shared/pages/Home/Home.scss");

var Home =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Home, _Component);

  function Home() {
    (0, _classCallCheck2["default"])(this, Home);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Home).apply(this, arguments));
  }

  (0, _createClass2["default"])(Home, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          products = _this$props.products,
          getProducts = _this$props.getProducts;

      if (!products.length) {// getProducts(`/products`);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          selectedCountry = _this$props2.selectedCountry,
          products = _this$props2.products;
      return _react["default"].createElement("div", {
        className: "Home d-flex flex-column align-items-center justify-content-center"
      }, _react["default"].createElement("h1", null, "Shop"), _react["default"].createElement("form", {
        className: "text-center col-md-4"
      }, _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("pre", null, " ", products, " "))));
    }
  }]);
  return Home;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    selectedCountry: state.selectedCountry,
    countries: state.countries
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getProducts: function getProducts(url) {
      dispatch((0, _actions.getProducts)(url));
    },
    setCountry: function setCountry(country) {
      dispatch(setSelectedProduct(country));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Home);

exports["default"] = _default;

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9idW5kbGUuMDAwZTZhMjA3MjBlNmI3ZGI2OTYuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcGFnZXMvSG9tZS9Ib21lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRQcm9kdWN0cyBhcyBnZXRQcm9kdWN0c0FjdGlvbiB9IGZyb20gJ0Avc3RvcmUvYWN0aW9ucyc7XG5cbmltcG9ydCAnLi9Ib21lLnNjc3MnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgc2V0U2VsZWN0ZWRQcm9kdWN0OiBzdHJpbmcsXG4gIGdldFByb2R1Y3RzOiAoc3RyaW5nKSA9PiBBcnJheTxPYmplY3Q+LFxufTtcblxuY2xhc3MgSG9tZSBleHRlbmRzIENvbXBvbmVudDxQcm9wc1R5cGU+IHtcbiAgXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgcHJvZHVjdHMsIGdldFByb2R1Y3RzIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghcHJvZHVjdHMubGVuZ3RoKSB7XG4gICAgICAvLyBnZXRQcm9kdWN0cyhgL3Byb2R1Y3RzYCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyICgpIHtcblxuICAgIGNvbnN0IHsgc2VsZWN0ZWRDb3VudHJ5LCBwcm9kdWN0cyB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nSG9tZSBkLWZsZXggZmxleC1jb2x1bW4gYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXInPlxuICAgICAgICA8aDE+U2hvcDwvaDE+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIGNvbC1tZC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8cHJlPiB7IHByb2R1Y3RzIH0gPC9wcmU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgey8qIDxMaW5rIHRvPVwicHJvZHVjdHNcIj5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIj5cbiAgICAgICAgICAgIEFsbCBwcm9kdWN0c1xuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L0xpbms+ICovfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4gKHtcbiAgc2VsZWN0ZWRDb3VudHJ5OiBzdGF0ZS5zZWxlY3RlZENvdW50cnksXG4gIGNvdW50cmllczogc3RhdGUuY291bnRyaWVzXG59KTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiAoe1xuICBnZXRQcm9kdWN0cyh1cmwpIHtcbiAgICBkaXNwYXRjaChnZXRQcm9kdWN0c0FjdGlvbih1cmwpKTtcbiAgfSxcbiAgc2V0Q291bnRyeShjb3VudHJ5KSB7XG4gICAgZGlzcGF0Y2goc2V0U2VsZWN0ZWRQcm9kdWN0KGNvdW50cnkpKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEhvbWUpO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQVdBOzs7QUE1QkE7QUFDQTtBQStCQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFDQTtBQUlBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUFBO0FBQ0E7QUFRQTtBQUNBOzs7OztBIiwic291cmNlUm9vdCI6IiJ9