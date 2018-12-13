webpackHotUpdate("bundle",{

/***/ "./src/shared/containers/RmMovies/RmMovies.js":
/*!****************************************************!*\
  !*** ./src/shared/containers/RmMovies/RmMovies.js ***!
  \****************************************************/
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

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _actions = __webpack_require__(/*! ../../actions */ "./src/shared/actions/index.js");

var _RmNav = _interopRequireDefault(__webpack_require__(/*! ../RmNav/RmNav */ "./src/shared/containers/RmNav/RmNav.js"));

var _RmMovieCard = _interopRequireDefault(__webpack_require__(/*! ../../components/RmMovieCard/RmMovieCard */ "./src/shared/components/RmMovieCard/RmMovieCard.js"));

__webpack_require__(/*! ./RmMovies.scss */ "./src/shared/containers/RmMovies/RmMovies.scss");

var RmMovies =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RmMovies, _Component);

  function RmMovies() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, RmMovies);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(RmMovies)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "searchTermHandler", function (searchTerm) {
      _this.props.setSearchTerm(searchTerm);
    });
    return _this;
  }

  (0, _createClass2.default)(RmMovies, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('this.props', this.props);

      if (this.props.movies.length === 0) {}
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          searchTerm = _this$props.searchTerm,
          movies = _this$props.movies;
      return _react.default.createElement("section", null, _react.default.createElement(_RmNav.default, {
        showSearch: true,
        searchTerm: searchTerm,
        onSearch: this.searchTermHandler
      }), _react.default.createElement("div", {
        className: "px-3"
      }, _react.default.createElement("div", {
        className: "d-flex align-items-start justify-content-between flex-wrap"
      }, movies.filter(function (movie) {
        return "".concat(movie.movieTitle, " ").concat(movie.description).toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0;
      }).map(function (movie) {
        return _react.default.createElement(_RmMovieCard.default, (0, _extends2.default)({
          key: movie.id
        }, movie));
      }))));
    }
  }]);
  return RmMovies;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    searchTerm: state.searchTerm,
    movies: state.movies
  };
};

var mapDispatchToProps = {
  getMovies: _actions.getMovies,
  setSearchTerm: _actions.setSearchTerm
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RmMovies);

exports.default = _default;

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9idW5kbGUuZTlmNDVlYWJlMGI0N2FjNTY4NWMuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29udGFpbmVycy9SbU1vdmllcy9SbU1vdmllcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGFycmF5T2YsIHNoYXBlLCBzdHJpbmcsIG51bWJlciB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgeyBzZXRTZWFyY2hUZXJtLCBnZXRNb3ZpZXMgfSBmcm9tICcuLi8uLi9hY3Rpb25zJztcbmltcG9ydCBSbU5hdiBmcm9tICcuLi9SbU5hdi9SbU5hdic7XG5pbXBvcnQgTW92aWVDYXJkIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvUm1Nb3ZpZUNhcmQvUm1Nb3ZpZUNhcmQnO1xuXG5pbXBvcnQgJy4vUm1Nb3ZpZXMuc2Nzcyc7XG5cbmNsYXNzIFJtTW92aWVzIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogU2V0cyBzdGF0ZSdzIHNlYXJjaFRlcm0gYW5kIGZpbHRlciB0aGUgbW92aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgc2VhcmNoVGVybUhhbmRsZXIgPSAoc2VhcmNoVGVybSkgPT4ge1xuICAgIHRoaXMucHJvcHMuc2V0U2VhcmNoVGVybShzZWFyY2hUZXJtKTtcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuICAgIGNvbnNvbGUubG9nKCd0aGlzLnByb3BzJywgdGhpcy5wcm9wcyk7XG4gICAgaWYgKHRoaXMucHJvcHMubW92aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgXG4gICAgfVxuXG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcblxuICAgIGNvbnN0IHsgc2VhcmNoVGVybSwgbW92aWVzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8Um1OYXZcbiAgICAgICAgICBzaG93U2VhcmNoPXt0cnVlfVxuICAgICAgICAgIHNlYXJjaFRlcm09e3NlYXJjaFRlcm19XG4gICAgICAgICAgb25TZWFyY2g9e3RoaXMuc2VhcmNoVGVybUhhbmRsZXJ9XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1mbGV4IGFsaWduLWl0ZW1zLXN0YXJ0IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAge21vdmllcy5maWx0ZXIobW92aWUgPT4gKFxuICAgICAgICAgICAgICBgJHttb3ZpZS5tb3ZpZVRpdGxlfSAke21vdmllLmRlc2NyaXB0aW9ufWAudG9VcHBlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRlcm0udG9VcHBlckNhc2UoKSkgPj0gMFxuICAgICAgICAgICAgKSkubWFwKG1vdmllID0+IChcbiAgICAgICAgICAgICAgPE1vdmllQ2FyZCBrZXk9e21vdmllLmlkfSB7Li4ubW92aWV9IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgKTtcblxuICB9XG5cbiAgXG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4gKHtcbiAgc2VhcmNoVGVybTogc3RhdGUuc2VhcmNoVGVybSxcbiAgbW92aWVzOiBzdGF0ZS5tb3ZpZXNcbn0pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7IFxuICBnZXRNb3ZpZXMsXG4gIHNldFNlYXJjaFRlcm0sICBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzXG4pKFJtTW92aWVzKTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBOzs7Ozs7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUlBOzs7QUFFQTs7O0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUdBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBREE7QUFRQTs7O0FBaERBO0FBQ0E7QUFvREE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUFBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==