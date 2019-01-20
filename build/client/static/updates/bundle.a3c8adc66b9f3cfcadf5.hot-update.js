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

      if (!countries.length) {
        this.props.dispatch(getCountries("".concat(_Urls.COUNTRIES, "/all")));
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
  return {
    getCountries: function getCountries() {
      dispatch();
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(Landing);

exports.default = _default;

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9idW5kbGUuYTNjOGFkYzY2YjlmM2NmY2FkZjUuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcGFnZXMvTGFuZGluZy9MYW5kaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBDT1VOVFJJRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvVXJscyc7XG5pbXBvcnQgeyBnZXRDb3VudHJpZXMgYXMgZ2V0Q291bnRyaWVzQWN0aW9uLCBzZXRTZWxlY3RlZENvdW50cnkgfSBmcm9tICcuLi8uLi9hY3Rpb25zJztcblxuaW1wb3J0ICcuL0xhbmRpbmcuc2Nzcyc7XG5cbmNsYXNzIExhbmRpbmcgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge1N5bnRoZXRpY0V2ZW50fSBldnRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGhhbmRsZUNoYW5nZSA9IChldnQpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZENvdW50cnkgPSBldnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goc2V0U2VsZWN0ZWRDb3VudHJ5KHNlbGVjdGVkQ291bnRyeSkpO1xuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgY291bnRyaWVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghY291bnRyaWVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChnZXRDb3VudHJpZXMoYCR7Q09VTlRSSUVTfS9hbGxgKSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyICgpIHtcblxuICAgIGNvbnN0IHsgc2VsZWN0ZWRDb3VudHJ5LCBjb3VudHJpZXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J0xhbmRpbmcgZC1mbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgPGgxPk1vdmllIFNlYXJjaDwvaDE+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIGNvbC1tZC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImNvdW50cmllc1wiPlNlbGVjdCBhIENvdW50cnk8L2xhYmVsPlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDb3VudHJ5fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9PlxuICAgICAgICAgICAgICB7Y291bnRyaWVzLm1hcCgoeyBuYW1lIH0pID0+IChcbiAgICAgICAgICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgICAgICAgICBpZD1cImNvdW50cmllc1wiXG4gICAgICAgICAgICAgICAgICBrZXk9e25hbWV9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17bmFtZX0+XG4gICAgICAgICAgICAgICAgICB7bmFtZX1cbiAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICA8TGluayB0bz1cIm1vdmllc1wiPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiPlxuICAgICAgICAgICAgU2VlIGFsbCBtb3ZpZXNcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9MaW5rPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4gKHtcbiAgc2VsZWN0ZWRDb3VudHJ5OiBzdGF0ZS5zZWxlY3RlZENvdW50cnksXG4gIGNvdW50cmllczogc3RhdGUuY291bnRyaWVzXG59KTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiAoe1xuICBnZXRDb3VudHJpZXMoKSB7XG4gICAgZGlzcGF0Y2goKTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoTGFuZGluZyk7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7Ozs7OztBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBSUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBREE7QUFXQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBTUE7OztBQW5EQTtBQUNBO0FBc0RBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUNBO0FBSUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQUE7QUFDQTtBQUtBO0FBQ0E7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=