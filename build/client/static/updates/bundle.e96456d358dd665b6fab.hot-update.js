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

      if (this.props.movies.length === 0) {
        this.props.dispatch();
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9idW5kbGUuZTk2NDU2ZDM1OGRkNjY1YjZmYWIuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29udGFpbmVycy9SbU1vdmllcy9SbU1vdmllcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGFycmF5T2YsIHNoYXBlLCBzdHJpbmcsIG51bWJlciB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgeyBzZXRTZWFyY2hUZXJtLCBnZXRNb3ZpZXMgfSBmcm9tICcuLi8uLi9hY3Rpb25zJztcbmltcG9ydCBSbU5hdiBmcm9tICcuLi9SbU5hdi9SbU5hdic7XG5pbXBvcnQgTW92aWVDYXJkIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvUm1Nb3ZpZUNhcmQvUm1Nb3ZpZUNhcmQnO1xuXG5pbXBvcnQgJy4vUm1Nb3ZpZXMuc2Nzcyc7XG5cbmNsYXNzIFJtTW92aWVzIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogU2V0cyBzdGF0ZSdzIHNlYXJjaFRlcm0gYW5kIGZpbHRlciB0aGUgbW92aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgc2VhcmNoVGVybUhhbmRsZXIgPSAoc2VhcmNoVGVybSkgPT4ge1xuICAgIHRoaXMucHJvcHMuc2V0U2VhcmNoVGVybShzZWFyY2hUZXJtKTtcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuICAgIGNvbnNvbGUubG9nKCd0aGlzLnByb3BzJywgdGhpcy5wcm9wcyk7XG4gICAgaWYgKHRoaXMucHJvcHMubW92aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCgpO1xuICAgIH1cblxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuXG4gIH1cblxuICByZW5kZXIoKSB7XG5cbiAgICBjb25zdCB7IHNlYXJjaFRlcm0sIG1vdmllcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPFJtTmF2XG4gICAgICAgICAgc2hvd1NlYXJjaD17dHJ1ZX1cbiAgICAgICAgICBzZWFyY2hUZXJtPXtzZWFyY2hUZXJtfVxuICAgICAgICAgIG9uU2VhcmNoPXt0aGlzLnNlYXJjaFRlcm1IYW5kbGVyfVxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImQtZmxleCBhbGlnbi1pdGVtcy1zdGFydCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgIHttb3ZpZXMuZmlsdGVyKG1vdmllID0+IChcbiAgICAgICAgICAgICAgYCR7bW92aWUubW92aWVUaXRsZX0gJHttb3ZpZS5kZXNjcmlwdGlvbn1gLnRvVXBwZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hUZXJtLnRvVXBwZXJDYXNlKCkpID49IDBcbiAgICAgICAgICAgICkpLm1hcChtb3ZpZSA9PiAoXG4gICAgICAgICAgICAgIDxNb3ZpZUNhcmQga2V5PXttb3ZpZS5pZH0gey4uLm1vdmllfSAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuICAgICk7XG5cbiAgfVxuXG4gIFxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+ICh7XG4gIHNlYXJjaFRlcm06IHN0YXRlLnNlYXJjaFRlcm0sXG4gIG1vdmllczogc3RhdGUubW92aWVzXG59KTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0geyBcbiAgZ2V0TW92aWVzLFxuICBzZXRTZWFyY2hUZXJtLCAgXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wc1xuKShSbU1vdmllcyk7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQVFBO0FBQ0E7QUFDQTs7Ozs7O0FBRUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7OztBQUVBOzs7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBR0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFEQTtBQVFBOzs7QUFoREE7QUFDQTtBQW9EQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBOzs7OztBIiwic291cmNlUm9vdCI6IiJ9