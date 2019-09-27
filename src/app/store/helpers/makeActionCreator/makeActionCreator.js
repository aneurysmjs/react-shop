// @flow strict
// $FlowIgnore
import { appendProps } from '@/utils/appendProps';

export type ActionType<P, M> = {
  type: string,
  payload: P,
  meta?: M,
};

type ActionCreatorType = <P, M>(P, M) => ActionType<P, M>;

const bareAction = appendProps('payload', 'meta');

function makeActionCreator(type: string): ActionCreatorType {
  return function actionCreator<P, M>(payload: P, meta: ?M = undefined) {
    return {
      type,
      ...bareAction({ payload, meta }),
    };
  };
}

export default makeActionCreator;
