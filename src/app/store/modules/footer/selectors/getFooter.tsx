import { State } from '~/store/State';

import { FooterState } from '../types';
// eslint-disable-next-line import/prefer-default-export
export const getFooter = ({ footer }: State): FooterState => footer;
