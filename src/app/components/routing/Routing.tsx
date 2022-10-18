import React, { FunctionComponent } from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import Layout from '~/components/core/Layout';

import Home from '~/components/pages/Home';

const Routing: FunctionComponent = () => (
  <Router>
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </Router>
);

export default Routing;
