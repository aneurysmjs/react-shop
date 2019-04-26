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

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

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
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Home);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Home)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleChange", function (evt) {
      var setSelectedProduct = _this.props.setSelectedProduct;
      var selectedCountry = evt.target.value; // setSelectedProduct(selectedCountry);
    });
    return _this;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9idW5kbGUuMzkxOWNlZTdhOTU3ZDYwMTI5ZjcuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcGFnZXMvSG9tZS9Ib21lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRQcm9kdWN0cyBhcyBnZXRQcm9kdWN0c0FjdGlvbiB9IGZyb20gJ0Avc3RvcmUvYWN0aW9ucyc7XG5cbmltcG9ydCAnLi9Ib21lLnNjc3MnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgc2V0U2VsZWN0ZWRQcm9kdWN0OiBzdHJpbmcsXG4gIGdldFByb2R1Y3RzOiAoc3RyaW5nKSA9PiBBcnJheTxPYmplY3Q+LFxufTtcblxuY2xhc3MgSG9tZSBleHRlbmRzIENvbXBvbmVudDxQcm9wc1R5cGU+IHtcblxuICBoYW5kbGVDaGFuZ2UgPSAoZXZ0KSA9PiB7XG4gICAgY29uc3QgeyBzZXRTZWxlY3RlZFByb2R1Y3QgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRDb3VudHJ5ID0gZXZ0LnRhcmdldC52YWx1ZTtcbiAgICAvLyBzZXRTZWxlY3RlZFByb2R1Y3Qoc2VsZWN0ZWRDb3VudHJ5KTtcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IHByb2R1Y3RzLCBnZXRQcm9kdWN0cyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXByb2R1Y3RzLmxlbmd0aCkge1xuICAgICAgLy8gZ2V0UHJvZHVjdHMoYC9wcm9kdWN0c2ApO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlciAoKSB7XG5cbiAgICBjb25zdCB7IHNlbGVjdGVkQ291bnRyeSwgcHJvZHVjdHMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J0hvbWUgZC1mbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgPGgxPlNob3A8L2gxPlxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBjb2wtbWQtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPHByZT4geyBwcm9kdWN0cyB9IDwvcHJlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIHsvKiA8TGluayB0bz1cInByb2R1Y3RzXCI+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCI+XG4gICAgICAgICAgICBBbGwgcHJvZHVjdHNcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9MaW5rPiAqL31cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+ICh7XG4gIHNlbGVjdGVkQ291bnRyeTogc3RhdGUuc2VsZWN0ZWRDb3VudHJ5LFxuICBjb3VudHJpZXM6IHN0YXRlLmNvdW50cmllc1xufSk7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4gKHtcbiAgZ2V0UHJvZHVjdHModXJsKSB7XG4gICAgZGlzcGF0Y2goZ2V0UHJvZHVjdHNBY3Rpb24odXJsKSk7XG4gIH0sXG4gIHNldENvdW50cnkoY291bnRyeSkge1xuICAgIGRpc3BhdGNoKHNldFNlbGVjdGVkUHJvZHVjdChjb3VudHJ5KSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShIb21lKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQUE7QUFFQTtBQUVBOzs7Ozs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBV0E7OztBQWxDQTtBQUNBO0FBcUNBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUNBO0FBSUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQUE7QUFDQTtBQVFBO0FBQ0E7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=