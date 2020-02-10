import { CartActionType } from '~/shared/types/CartType';
import { FooterActionType } from '~/shared/types/FooterType';
import { ProductActionType } from '~/store/modules/products/types';

export type Actions = CartActionType | FooterActionType | ProductActionType;
