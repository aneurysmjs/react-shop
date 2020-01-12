import { FunctionComponent } from 'react';

import withAlien from '~/store/config/alienStore/withAlien';
import HomeComponent from './Home';

const Home: FunctionComponent = () =>
  withAlien(HomeComponent, {
    id: 'products',
    getModule: () => import('~/store/modules/products/products.module'),
  });

export default Home;
