// @flow strict
// $FlowIgnore
import { appendProps } from '@/utils/appendProps';

import type { ActionType } from '@/shared/types/CommonType';

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
