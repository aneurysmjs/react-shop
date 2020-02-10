import { FooterState, FooterAction } from '~/store/modules/footer/types';

import { FOOTER_DATA } from '~/store/modules/footer/types/actionTypes';

const initialState = {
  social: [{ id: '0', icon: 'instagram', link: 'https://instagram.com' }],
};

function footerReducer(state: FooterState = initialState, action: FooterAction): FooterState {
  switch (action.type) {
    case FOOTER_DATA: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}

export default footerReducer;
