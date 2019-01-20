/**
 * @desc handles all API's async actions
 * @param {Function} dispatch
 * @param {Function} getState
 * @return {Function}
 */
export default function apiMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {}
    } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch({
      ...payload,
      type: requestType
    });

    (async () => {
      try {
        const response = await callAPI();
        return dispatch({
          ...payload,
          response,
          type: successType
        });
      } catch (error) {
        return dispatch({
          ...payload,
          error,
          type: failureType
        });
      }
    })();
  };
}