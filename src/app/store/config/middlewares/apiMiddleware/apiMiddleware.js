// @flow strict
import type { Dispatch, Middleware } from 'redux';

import type { State } from '@/store/types/State';
import type { Actions, AsyncAction } from '@/store/types/Actions';

type ApiMiddlewareType = Middleware<State, Actions, Dispatch<AsyncAction>>;

const apiMiddleware: ApiMiddlewareType = ({ dispatch, getState }) => (next) => (action) => {
  let meta = {};

  if (action.meta) {
    meta = { ...action.meta };
  }

  if (!action.meta && !meta.types) {
    // Normal action: pass it on
    return next(action);
  }

  const {
    payload = {},
  } = action;

  const {
    types,
    callAPI,
    shouldCallAPI = (s = true) => s,
  } = meta;

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
    payload: { ...payload },
    type: requestType,
  });
  // $FlowFixMe
  return (async () => {
    try {
      const response = await callAPI();
      return dispatch({
        payload: { response },
        type: successType,
      });
    } catch (error) {
      return dispatch({
        payload: { error },
        type: failureType,
      });
    }
  })();
};

export default apiMiddleware;
