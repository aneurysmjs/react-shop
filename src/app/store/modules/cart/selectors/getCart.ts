import { State } from '~/store/State';
import { Cart } from '../types';
// eslint-disable-next-line import/prefer-default-export
export const getCart = ({ cart }: State): Cart => cart;
