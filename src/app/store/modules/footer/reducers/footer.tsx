import { FooterType, FooterActionType } from '~/shared/types/FooterType';

import { FOOTER_DATA } from '~/store/ActionTypes';

import { createReducer } from '~/store/helpers/createReducer';

const initialState = {
  social: [{ id: '0', icon: 'instagram', link: 'https://instagram.com' }],
};

export default createReducer<FooterType, FooterActionType>(initialState, {
  [FOOTER_DATA](state) {
    return {
      ...state,
    };
  },
});
