// @flow strict

import type { State } from '@/store/types/State';

import footer from './footer';

export default footer;

export const getFooter = (state: State) => state.footer;
