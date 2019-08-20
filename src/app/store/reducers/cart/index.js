// @flow strict

import type { State } from '@/store/types/State';

import cart from './cart';

export default cart;

export const getCart = (state: State) => state.cart;
