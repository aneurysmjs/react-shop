/* eslint-disable consistent-return */
// @flow strict
import type { ApiMetaType } from '@/shared/types/CommonType';
import type { ApiMiddlewareType } from '@/shared/types/MiddlewareTypes';

const apiMiddleware: ApiMiddlewareType = ({ dispatch, getState }) => (next) => (action) => {
  let meta: ApiMetaType = {};

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
    return;
  }

  const [requestType, successType, failureType] = types;

  dispatch({
    payload: { ...payload },
    type: requestType,
  });

  (async () => {
    try {
      const response: Response = await callAPI();
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
