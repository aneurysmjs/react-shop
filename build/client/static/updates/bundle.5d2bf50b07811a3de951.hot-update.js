webpackHotUpdate("bundle",{

/***/ "./src/shared/reducers/movies.js":
/*!***************************************!*\
  !*** ./src/shared/reducers/movies.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _createReducer2 = _interopRequireDefault(__webpack_require__(/*! ./createReducer */ "./src/shared/reducers/createReducer.js"));

var _ActionTypes = __webpack_require__(/*! ../constants/ActionTypes */ "./src/shared/constants/ActionTypes.js");

/**
 * @module reducers/movies
 */

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
var _default = (0, _createReducer2.default)([], (0, _defineProperty2.default)({}, _ActionTypes.MOVIES_SUCCESS, function (state, action) {
  var results = action.response.data.results;
  return (0, _toConsumableArray2.default)(results);
}));

exports.default = _default;

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9idW5kbGUuNWQyYmY1MGIwNzgxMWEzZGU5NTEuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcmVkdWNlcnMvbW92aWVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZSByZWR1Y2Vycy9tb3ZpZXNcbiAqL1xuaW1wb3J0IGNyZWF0ZVJlZHVjZXIgZnJvbSAnLi9jcmVhdGVSZWR1Y2VyJztcblxuaW1wb3J0IHsgTU9WSUVTX1NVQ0NFU1MgfSAgZnJvbSAnLi4vY29uc3RhbnRzL0FjdGlvblR5cGVzJztcblxuLyoqXG4gKlxuICogQHBhcmFtIHN0YXRlXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcmV0dXJuIHsqfVxuICovXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSZWR1Y2VyKFtdLCB7XG4gIFtNT1ZJRVNfU1VDQ0VTU10oc3RhdGUsIGFjdGlvbikge1xuICAgIGNvbnN0IHtcbiAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICByZXN1bHRzXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0gPSBhY3Rpb247XG4gICAgcmV0dXJuIFsuLi5yZXN1bHRzXTtcbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7Ozs7QUFPQTs7Ozs7O0FBTUE7QUFDQTtBQVFBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==