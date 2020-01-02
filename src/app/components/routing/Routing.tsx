/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ReactElement } from 'react';
import { Route } from 'react-router-dom';

import Layout from '~/components/core/Layout';
import withAlien from '~/store/config/alienStore/withAlien';

import Home from '~/components/pages/Home';

const Routing = (): ReactElement => (
  <main>
    <Layout>
      <Route
        exact
        path="/"
        component={() => withAlien(Home, () => import('~/store/modules/products/products.module'))}
      />
    </Layout>
  </main>
);

export default Routing;
