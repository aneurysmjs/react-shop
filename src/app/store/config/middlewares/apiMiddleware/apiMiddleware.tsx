/* eslint-disable consistent-return */
import { AnyAction } from 'redux';
import { ApiMiddlewareType, ApiMetaType } from '~/shared/types/MiddlewareTypes';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const apiMiddleware: ApiMiddlewareType = ({ dispatch, getState }) => (next) => (action) => {
  let meta = {} as ApiMetaType;

  if (action.meta) {
    meta = { ...action.meta };
  }

  if (!action.meta && !meta.types) {
    // Normal action: pass it on
    return next(action);
  }

  const { payload = {} } = action;

  const { types, callAPI, shouldCallAPI = (s = true): boolean => s } = meta;

  if (
    !Array.isArray(types) ||
    types.length !== 3 ||
    !types.every((type) => typeof type === 'string')
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

  return (async (): Promise<AnyAction> => {
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
