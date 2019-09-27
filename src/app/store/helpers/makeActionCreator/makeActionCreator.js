// @flow strict
export type ActionType<P, M> = {
  type: string,
  payload: P,
  meta?: M,
};

type ActionCreatorType = <P, M>(P, M) => ActionType<P, M>;

/**
 * @desc: conditionally append properties as they exist
 */
const bareAction = (action) => ({
  ...action.payload && { payload: action.payload },
  ...action.meta && { meta: action.meta },
});

function makeActionCreator(type: string): ActionCreatorType {
  return function actionCreator<P, M>(payload: P, meta: ?M = undefined) {
    return {
      type,
      ...bareAction({ payload, meta }),
    };
  };
}

export default makeActionCreator;
