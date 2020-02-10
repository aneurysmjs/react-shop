import { ReactElement } from 'react';

import withAlien from '~/store/config/alienStore/withAlien';
import UserMenuComponent from './UserMenu';

type CartModule = Promise<typeof import('~/store/modules/cart/cart.module')>;

export default (): ReactElement =>
  withAlien(UserMenuComponent, [
    (): CartModule =>
      import(/* webpackChunkName: "ReduxModule" */ '~/store/modules/cart/cart.module'),
  ]);
