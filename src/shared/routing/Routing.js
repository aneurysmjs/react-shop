import React from 'react';
import {
  Route
} from 'react-router-dom';

import Layout from '@/components/core/Layout/Layout';

import Home from '@/pages/Home/Home';

const Loading = () => (<div>...</div>);

const Routing = () => (
  <main>
    <Layout>
      <Route exact path="/" component={Home} />
    </Layout>
  </main>
);

export default Routing;
