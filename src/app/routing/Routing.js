// @flow strict
import React from 'react';
import {
  Route,
} from 'react-router-dom';

import Layout from '@/components/core/Layout/Layout';
// $FlowIgnoreMe
import loadable from '@loadable/component';

const Home = loadable(() => import(/* webpackChunkName: "Home" */'@/pages/Home/Home'));

// import Home from '@/pages/Home/Home';

// const Loading = () => (<div>...</div>);

const Routing = () => (
  <main>
    <Layout>
      <Route exact path="/" component={Home} />
    </Layout>
  </main>
);

export default Routing;
