import React, { ReactElement } from 'react';
import { Route } from 'react-router-dom';

import Layout from '~/components/core/Layout';

import Home from '~/components/pages/Home';

const Routing = (): ReactElement => (
  <main>
    <Layout>
      <Route exact path="/" component={Home} />
    </Layout>
  </main>
);

export default Routing;
