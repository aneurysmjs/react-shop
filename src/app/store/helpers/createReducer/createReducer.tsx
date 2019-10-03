/* eslint-disable */

// type HandlersType<S, A> = {
//   [key: string]: Reducer<S, A>
// };

const has = Object.prototype.hasOwnProperty;

function createReducer(
  initialState,
  handlers,
) {
  return function reducer(state = initialState, action: A) {
    if (has.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export default createReducer;
