import { ReactElement } from 'react';

import withAlien from '~/store/config/alienStore/withAlien';
import HomeComponent from './Home';

type ProductsModules = Promise<typeof import('~/store/modules/products/products.module')>;

export default (): ReactElement =>
  withAlien(HomeComponent, [
    (): ProductsModules =>
      import(/* webpackChunkName: "ReduxModule" */ '~/store/modules/products/products.module'),
  ]);
