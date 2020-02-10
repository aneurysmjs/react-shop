import { ReactElement } from 'react';

import withAlien from '~/store/config/alienStore/withAlien';
import FooterComponent from './Footer';

type FooterModule = Promise<typeof import('~/store/modules/footer/footer.module')>;

export default (): ReactElement =>
  withAlien(FooterComponent, [
    (): FooterModule =>
      import(/* webpackChunkName: "ReduxModule" */ '~/store/modules/footer/footer.module'),
  ]);
