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
      (0, _actions.setSelectedCountry)(selectedCountry);
    });
    return _this;
  }

  (0, _createClass2.default)(Landing, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var countries = this.props.countries;

      if (!countries.length) {
        getCountries("".concat(_Urls.COUNTRIES, "/all"));
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
    getCountries: function getCountries(url) {
      dispatch((0, _actions.getCountries)(url));
    },
    setCountry: function setCountry(country) {
      dispatch((0, _actions.setSelectedCountry)(country));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(Landing);

exports.default = _default;

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9idW5kbGUuNzhkYWM0YmU5YzVlZWI4ZWZmZGQuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcGFnZXMvTGFuZGluZy9MYW5kaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBDT1VOVFJJRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvVXJscyc7XG5pbXBvcnQgeyBnZXRDb3VudHJpZXMgYXMgZ2V0Q291bnRyaWVzQWN0aW9uLCBzZXRTZWxlY3RlZENvdW50cnkgfSBmcm9tICcuLi8uLi9hY3Rpb25zJztcblxuaW1wb3J0ICcuL0xhbmRpbmcuc2Nzcyc7XG5cbmNsYXNzIExhbmRpbmcgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge1N5bnRoZXRpY0V2ZW50fSBldnRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGhhbmRsZUNoYW5nZSA9IChldnQpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZENvdW50cnkgPSBldnQudGFyZ2V0LnZhbHVlO1xuICAgIHNldFNlbGVjdGVkQ291bnRyeShzZWxlY3RlZENvdW50cnkpXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBjb3VudHJpZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjb3VudHJpZXMubGVuZ3RoKSB7XG4gICAgICBnZXRDb3VudHJpZXMoYCR7Q09VTlRSSUVTfS9hbGxgKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIgKCkge1xuXG4gICAgY29uc3QgeyBzZWxlY3RlZENvdW50cnksIGNvdW50cmllcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nTGFuZGluZyBkLWZsZXggZmxleC1jb2x1bW4gYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXInPlxuICAgICAgICA8aDE+TW92aWUgU2VhcmNoPC9oMT5cbiAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgY29sLW1kLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiY291bnRyaWVzXCI+U2VsZWN0IGEgQ291bnRyeTwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZENvdW50cnl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0+XG4gICAgICAgICAgICAgIHtjb3VudHJpZXMubWFwKCh7IG5hbWUgfSkgPT4gKFxuICAgICAgICAgICAgICAgIDxvcHRpb25cbiAgICAgICAgICAgICAgICAgIGlkPVwiY291bnRyaWVzXCJcbiAgICAgICAgICAgICAgICAgIGtleT17bmFtZX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuYW1lfT5cbiAgICAgICAgICAgICAgICAgIHtuYW1lfVxuICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDxMaW5rIHRvPVwibW92aWVzXCI+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCI+XG4gICAgICAgICAgICBTZWUgYWxsIG1vdmllc1xuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L0xpbms+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiAoe1xuICBzZWxlY3RlZENvdW50cnk6IHN0YXRlLnNlbGVjdGVkQ291bnRyeSxcbiAgY291bnRyaWVzOiBzdGF0ZS5jb3VudHJpZXNcbn0pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+ICh7XG4gIGdldENvdW50cmllcyh1cmwpIHtcbiAgICBkaXNwYXRjaChnZXRDb3VudHJpZXNBY3Rpb24odXJsKSk7XG4gIH0sXG4gIHNldENvdW50cnkoY291bnRyeSkge1xuICAgIGRpc3BhdGNoKHNldFNlbGVjdGVkQ291bnRyeShjb3VudHJ5KSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoTGFuZGluZyk7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUlBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQURBO0FBV0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQU1BOzs7QUFuREE7QUFDQTtBQXNEQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFDQTtBQUlBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUFBO0FBQ0E7QUFRQTtBQUNBOzs7OztBIiwic291cmNlUm9vdCI6IiJ9