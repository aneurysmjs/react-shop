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

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

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

  function RmMovies(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RmMovies);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RmMovies).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "searchTermHandler", function (searchTerm) {
      _this.props.setSearchTerm(searchTerm);
    });
    props.getMovies("../../assets/json/movies.json");
    return _this;
  }
  /**
   * Sets state's searchTerm and filter the movies.
   *
   * @param {string} searchTerm
   * @return {void}
   */


  (0, _createClass2.default)(RmMovies, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('this', this); // if (this.props.movies.length === 0) {
      //   this.props.dispatch(getMovies(`../../assets/json/movies.json`));
      // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9idW5kbGUuMjY5ODc3NjgwMDA0ZmI2M2YzMGQuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29udGFpbmVycy9SbU1vdmllcy9SbU1vdmllcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGFycmF5T2YsIHNoYXBlLCBzdHJpbmcsIG51bWJlciB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgeyBzZXRTZWFyY2hUZXJtLCBnZXRNb3ZpZXMgfSBmcm9tICcuLi8uLi9hY3Rpb25zJztcbmltcG9ydCBSbU5hdiBmcm9tICcuLi9SbU5hdi9SbU5hdic7XG5pbXBvcnQgTW92aWVDYXJkIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvUm1Nb3ZpZUNhcmQvUm1Nb3ZpZUNhcmQnO1xuXG5pbXBvcnQgJy4vUm1Nb3ZpZXMuc2Nzcyc7XG5cbmNsYXNzIFJtTW92aWVzIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBwcm9wcy5nZXRNb3ZpZXMoYC4uLy4uL2Fzc2V0cy9qc29uL21vdmllcy5qc29uYCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBzdGF0ZSdzIHNlYXJjaFRlcm0gYW5kIGZpbHRlciB0aGUgbW92aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgc2VhcmNoVGVybUhhbmRsZXIgPSAoc2VhcmNoVGVybSkgPT4ge1xuICAgIHRoaXMucHJvcHMuc2V0U2VhcmNoVGVybShzZWFyY2hUZXJtKTtcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuY29uc29sZS5sb2coJ3RoaXMnLCB0aGlzKTtcbiAgICAvLyBpZiAodGhpcy5wcm9wcy5tb3ZpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gICB0aGlzLnByb3BzLmRpc3BhdGNoKGdldE1vdmllcyhgLi4vLi4vYXNzZXRzL2pzb24vbW92aWVzLmpzb25gKSk7XG4gICAgLy8gfVxuXG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcblxuICAgIGNvbnN0IHsgc2VhcmNoVGVybSwgbW92aWVzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8Um1OYXZcbiAgICAgICAgICBzaG93U2VhcmNoPXt0cnVlfVxuICAgICAgICAgIHNlYXJjaFRlcm09e3NlYXJjaFRlcm19XG4gICAgICAgICAgb25TZWFyY2g9e3RoaXMuc2VhcmNoVGVybUhhbmRsZXJ9XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1mbGV4IGFsaWduLWl0ZW1zLXN0YXJ0IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAge21vdmllcy5maWx0ZXIobW92aWUgPT4gKFxuICAgICAgICAgICAgICBgJHttb3ZpZS5tb3ZpZVRpdGxlfSAke21vdmllLmRlc2NyaXB0aW9ufWAudG9VcHBlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRlcm0udG9VcHBlckNhc2UoKSkgPj0gMFxuICAgICAgICAgICAgKSkubWFwKG1vdmllID0+IChcbiAgICAgICAgICAgICAgPE1vdmllQ2FyZCBrZXk9e21vdmllLmlkfSB7Li4ubW92aWV9IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgKTtcblxuICB9XG5cbiAgXG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4gKHtcbiAgc2VhcmNoVGVybTogc3RhdGUuc2VhcmNoVGVybSxcbiAgbW92aWVzOiBzdGF0ZS5tb3ZpZXNcbn0pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7IFxuICBnZXRNb3ZpZXMsXG4gIHNldFNlYXJjaFRlcm0sICBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzXG4pKFJtTW92aWVzKTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBRUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBWUE7QUFDQTtBQVhBO0FBRkE7QUFHQTtBQUVBOzs7Ozs7Ozs7O0FBVUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTs7O0FBRUE7OztBQUlBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFHQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQURBO0FBUUE7OztBQXJEQTtBQUNBO0FBeURBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=