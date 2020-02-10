import { FooterType, FooterActionType } from '~/shared/types/FooterType';

import { FOOTER_DATA } from '~/store/ActionTypes';

const initialState = {
  social: [{ id: '0', icon: 'instagram', link: 'https://instagram.com' }],
};

function footerReducer(state: FooterType = initialState, action: FooterActionType): FooterType {
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
