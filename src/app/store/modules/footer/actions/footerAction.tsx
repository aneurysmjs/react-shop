import { ActionCreator } from '~/shared/types/CommonType';

import { FOOTER_DATA } from '../types/actionTypes';
import { FooterState } from '../types';

const footerAction: ActionCreator<FooterState> = (payload) => ({
  type: FOOTER_DATA,
  payload,
});

export default footerAction;
