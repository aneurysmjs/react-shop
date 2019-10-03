// @flow strict
import type { ActionType } from '@/shared/types/CommonType';

type FooterContact = {
  phone: string,
  email: string,
};

type FooterSocial = {id: string, icon: string, link: string};

type FooterColumn = { id: string, text: string, link: string};

export type FooterType = {
  contact?: FooterContact,
  social?: Array<FooterSocial>,
  columns?: Array<FooterColumn>
};

export type FooterActionType = ActionType<FooterType>;
