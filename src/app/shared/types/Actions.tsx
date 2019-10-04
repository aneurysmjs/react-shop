import { CartActionType } from '~/shared/types/CartType';
import { FooterActionType } from '~/shared/types/FooterType';
import { ProductActionType } from '~/shared/types/ProductsType';

export type Actions = CartActionType | FooterActionType | ProductActionType;
