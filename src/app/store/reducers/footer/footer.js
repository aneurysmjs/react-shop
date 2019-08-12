// @flow strict

import type { FooterType, FooterActionType } from '@/store/types/FooterType';

import { FOOTER_DATA } from '@/store/ActionTypes';
import type { State } from '@/store/types/State';

import createReducer from '../createReducer';

const initialState = {
  social: [
    { id: '0', icon: 'instagram', link: 'https://instagram.com' },
  ],
};

export default createReducer<FooterType, FooterActionType>(initialState, {
  [FOOTER_DATA](state) {
    return {
      ...state,
    };
  },
});

export const getFooter = ({ footer }: State) => footer;
