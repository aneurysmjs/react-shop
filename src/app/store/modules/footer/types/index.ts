import { Action } from '~/shared/types/CommonType';

import { FOOTER_DATA } from './actionTypes';

type FooterContact = {
  phone: string;
  email: string;
};

type FooterSocial = { id: string; icon: string; link: string };

type FooterColumn = { id: string; text: string; link: string };

export type FooterState = {
  contact?: FooterContact;
  social?: Array<FooterSocial>;
  columns?: Array<FooterColumn>;
};

export interface FooterAction extends Action<FooterState> {
  type: typeof FOOTER_DATA;
}
