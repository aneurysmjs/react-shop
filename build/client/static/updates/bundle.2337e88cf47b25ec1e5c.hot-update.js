webpackHotUpdate("bundle",{

/***/ "./src/shared/pages/Landing/Landing.js":
/*!*********************************************!*\
  !*** ./src/shared/pages/Landing/Landing.js ***!
  \*********************************************/
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

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _Urls = __webpack_require__(/*! ../../constants/Urls */ "./src/shared/constants/Urls.js");

var _actions = __webpack_require__(/*! ../../actions */ "./src/shared/actions/index.js");

__webpack_require__(/*! ./Landing.scss */ "./src/shared/pages/Landing/Landing.scss");

var Landing =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Landing, _Component);

  function Landing() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Landing);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Landing)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (evt) {
      var selectedCountry = evt.target.value;

      _this.props.dispatch((0, _actions.setSelectedCountry)(selectedCountry));
    });
    return _this;
  }

  (0, _createClass2.default)(Landing, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var countries = this.props.countries;

      if (!this.props.countries.length) {
        this.props.dispatch((0, _actions.getCountries)("".concat(_Urls.COUNTRIES, "/all")));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          selectedCountry = _this$props.selectedCountry,
          countries = _this$props.countries;
      return _react.default.createElement("div", {
        className: "Landing d-flex flex-column align-items-center justify-content-center"
      }, _react.default.createElement("h1", null, "Movie Search"), _react.default.createElement("form", {
        className: "text-center col-md-4"
      }, _react.default.createElement("div", {
        className: "form-group"
      }, _react.default.createElement("label", {
        htmlFor: "countries"
      }, "Select a Country"), _react.default.createElement("select", {
        value: selectedCountry,
        className: "form-control",
        onChange: this.handleChange
      }, countries.map(function (_ref) {
        var name = _ref.name;
        return _react.default.createElement("option", {
          id: "countries",
          key: name,
          value: name
        }, name);
      })))), _react.default.createElement(_reactRouterDom.Link, {
        to: "movies"
      }, _react.default.createElement("button", {
        type: "button",
        className: "btn btn-primary"
      }, "See all movies")));
    }
  }]);
  return Landing;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    selectedCountry: state.selectedCountry,
    countries: state.countries
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(Landing);

exports.default = _default;

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9idW5kbGUuMjMzN2U4OGNmNDdiMjVlYzFlNWMuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcGFnZXMvTGFuZGluZy9MYW5kaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBDT1VOVFJJRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvVXJscyc7XG5pbXBvcnQgeyBnZXRDb3VudHJpZXMsIHNldFNlbGVjdGVkQ291bnRyeSB9IGZyb20gJy4uLy4uL2FjdGlvbnMnO1xuXG5pbXBvcnQgJy4vTGFuZGluZy5zY3NzJztcblxuY2xhc3MgTGFuZGluZyBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7U3ludGhldGljRXZlbnR9IGV2dFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgaGFuZGxlQ2hhbmdlID0gKGV2dCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkQ291bnRyeSA9IGV2dC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5wcm9wcy5kaXNwYXRjaChzZXRTZWxlY3RlZENvdW50cnkoc2VsZWN0ZWRDb3VudHJ5KSk7XG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBjb3VudHJpZXMgfSA9IHRoaXMucHJvcHNcbiAgICBpZiAoIXRoaXMucHJvcHMuY291bnRyaWVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChnZXRDb3VudHJpZXMoYCR7Q09VTlRSSUVTfS9hbGxgKSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyICgpIHtcblxuICAgIGNvbnN0IHsgc2VsZWN0ZWRDb3VudHJ5LCBjb3VudHJpZXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J0xhbmRpbmcgZC1mbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgPGgxPk1vdmllIFNlYXJjaDwvaDE+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIGNvbC1tZC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImNvdW50cmllc1wiPlNlbGVjdCBhIENvdW50cnk8L2xhYmVsPlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDb3VudHJ5fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9PlxuICAgICAgICAgICAgICB7Y291bnRyaWVzLm1hcCgoeyBuYW1lIH0pID0+IChcbiAgICAgICAgICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgICAgICAgICBpZD1cImNvdW50cmllc1wiXG4gICAgICAgICAgICAgICAgICBrZXk9e25hbWV9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17bmFtZX0+XG4gICAgICAgICAgICAgICAgICB7bmFtZX1cbiAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICA8TGluayB0bz1cIm1vdmllc1wiPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiPlxuICAgICAgICAgICAgU2VlIGFsbCBtb3ZpZXNcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9MaW5rPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4gKHtcbiAgc2VsZWN0ZWRDb3VudHJ5OiBzdGF0ZS5zZWxlY3RlZENvdW50cnksXG4gIGNvdW50cmllczogc3RhdGUuY291bnRyaWVzXG59KTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiAoe1xuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKExhbmRpbmcpOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUlBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQURBO0FBV0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQU1BOzs7QUFuREE7QUFDQTtBQXNEQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFDQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==