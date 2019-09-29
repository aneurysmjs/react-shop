/* eslint-disable consistent-return */
// @flow strict
import type { Dispatch, Middleware } from 'redux';

import type { State } from '@/shared/types/State';
import type { Actions } from '@/shared/types/Actions';
import type { ApiMetaType } from '@/shared/types/CommonType';

type ApiMiddlewareType = Middleware<State, Actions, Dispatch<Actions>>;

// $FlowIgnore - middlewares dispatch actions and not return anything
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
    // $FlowIgnore
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
      // eslint-disable-next-line no-console
      // console.log('response', response);
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
