// @flow strict
import type { CartActionType } from '@/shared/types/CartType';
import type { FooterActionType } from '@/shared/types/FooterType';
import type { ProductActionType } from '@/shared/types/ProductsType';

export type Actions =
  CartActionType |
  FooterActionType |
  ProductActionType;
