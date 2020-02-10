import React from 'react';
import { Route } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import loadable from '@loadable/component'; // eslint-disable-line @typescript-eslint/no-unused-vars
import Layout from '~/components/core/Layout';

// const Home = loadable(() => import(/* webpackChunkName: "Home" */'~/pages/Home/Home'));

import Home from '~/components/pages/Home';

// const Loading = () => (<div>...</div>);

const Routing = (): React.ReactElement => (
  <main>
    <Layout>
      <Route exact path="/" component={Home} />
    </Layout>
  </main>
);

export default Routing;
