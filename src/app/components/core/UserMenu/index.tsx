import { FunctionComponent } from 'react';

import withAlien from '~/store/config/alienStore/withAlien';
import UserMenuComponent from './UserMenu';

type CartModule = Promise<typeof import('~/store/modules/cart/cart.module')>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserMenu: FunctionComponent<{ modules: Array<any> }> = () =>
  withAlien(UserMenuComponent, [
    (): CartModule =>
      import(/* webpackChunkName: "ReduxModule" */ '~/store/modules/cart/cart.module'),
  ]);

export default UserMenu;
