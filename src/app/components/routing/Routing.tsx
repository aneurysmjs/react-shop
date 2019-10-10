import React, { ReactElement, ComponentType } from 'react';
import { Route } from 'react-router-dom';

import loadable from '@loadable/component'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { withStoreModule } from '~/store/config/dynoStore';

import Layout from '~/components/core/Layout';

/**
 * @des by the moment it has be like this since @loable/babel-plugin gets mad:
 *
 * loadable: multiple import calls inside `loadable()` function are not supported.
 *
 * also if we remove @loable/babel-plugin, we no longer have code-splitting for SSR
 */
const HomeModule = (): Promise<{ default: ComponentType }> =>
  withStoreModule(
    import(/* webpackChunkName: "Home" */ '~/components/pages/Home'),
    import(/* webpackChunkName: "productsReducer" */ '~/store/modules/products/reducers'),
  );

const Home = loadable(HomeModule);

const Routing = (): ReactElement => (
  <main>
    <Layout>
      <Route exact path="/" component={Home} />
    </Layout>
  </main>
);

export default Routing;
