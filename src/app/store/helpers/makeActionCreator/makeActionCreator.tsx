import pluckProps from '~/shared/utils/pluckProps';

import { ActionType } from '~/shared/types/CommonType';

type ActionCreatorType = <P, M = {}>(payload: P, meta?: M) => ActionType<P, M>;

const bareAction = pluckProps('payload', 'meta');

function makeActionCreator(type: string): ActionCreatorType {
  const actionCreator: ActionCreatorType = <P, M = {}>(payload: P, meta: M) => ({
    type,
    ...bareAction({ payload, meta }),
  });
  return actionCreator;
}

export default makeActionCreator;
