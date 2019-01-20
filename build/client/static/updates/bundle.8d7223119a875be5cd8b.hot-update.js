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
  console.log('state', state);
  console.log('action', action);
  var results = action.response.data.results;
  return (0, _toConsumableArray2.default)(results);
}));

exports.default = _default;

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlcy9idW5kbGUuOGQ3MjIzMTE5YTg3NWJlNWNkOGIuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcmVkdWNlcnMvbW92aWVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1vZHVsZSByZWR1Y2Vycy9tb3ZpZXNcbiAqL1xuaW1wb3J0IGNyZWF0ZVJlZHVjZXIgZnJvbSAnLi9jcmVhdGVSZWR1Y2VyJztcblxuaW1wb3J0IHsgTU9WSUVTX1NVQ0NFU1MgfSAgZnJvbSAnLi4vY29uc3RhbnRzL0FjdGlvblR5cGVzJztcblxuLyoqXG4gKlxuICogQHBhcmFtIHN0YXRlXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcmV0dXJuIHsqfVxuICovXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSZWR1Y2VyKFtdLCB7XG4gIFtNT1ZJRVNfU1VDQ0VTU10oc3RhdGUsIGFjdGlvbikge1xuICAgIGNvbnNvbGUubG9nKCdzdGF0ZScsIHN0YXRlKTtcbiAgICBjb25zb2xlLmxvZygnYWN0aW9uJywgYWN0aW9uKTtcbiAgICBjb25zdCB7XG4gICAgICByZXNwb25zZToge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgcmVzdWx0c1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9ID0gYWN0aW9uO1xuICAgIHJldHVybiBbLi4ucmVzdWx0c107XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQU5BOzs7O0FBT0E7Ozs7OztBQU1BO0FBRUE7QUFDQTtBQUZBO0FBVUE7QUFDQTtBQUNBOzs7OztBIiwic291cmNlUm9vdCI6IiJ9