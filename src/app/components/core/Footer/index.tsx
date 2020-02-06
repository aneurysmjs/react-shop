import { FunctionComponent } from 'react';

import withAlien from '~/store/config/alienStore/withAlien';
import FooterComponent from './Footer';

type FooterModule = Promise<typeof import('~/store/modules/footer/footer.module')>;

const Footer: FunctionComponent<{ modules: Array<FooterModule> }> = () =>
  withAlien(FooterComponent, [
    (): FooterModule =>
      import(/* webpackChunkName: "ReduxModule" */ '~/store/modules/footer/footer.module'),
  ]);

export default Footer;
