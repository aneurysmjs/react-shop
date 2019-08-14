// @flow strict
import type { Dispatch, Middleware } from 'redux';

import type { State } from '@/store/types/State';
import type { Actions, MiddlewareAction } from '@/store/types/Actions';

// eslint-disable-next-line max-len, arrow-body-style
const apiMiddleware: Middleware<State, Actions, Dispatch<MiddlewareAction<State>>> = ({ dispatch, getState }) => {
  // $FlowFixMe
  return (next) => (action) => { // eslint-disable-line consistent-return
    const {
      types,
      callAPI,
      shouldCallAPI = (s = true) => s,
      payload = {},
    } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (
      !Array.isArray(types)
      || types.length !== 3
      || !types.every((type) => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      // $FlowFixMe
      return; // eslint-disable-line consistent-return
    }

    const [requestType, successType, failureType] = types;

    dispatch({
      ...payload,
      type: requestType,
    });

    (async () => {
      try {
        const response = await callAPI();
        return dispatch({
          ...payload,
          response,
          type: successType,
        });
      } catch (error) {
        return dispatch({
          ...payload,
          error,
          type: failureType,
        });
      }
    })();
  };
};

export default apiMiddleware;
