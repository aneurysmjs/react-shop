import type { FC } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from '@/components/common/Layout';
import Home from '@/modules/home';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PageLoader = () => <div>Loading...</div>;

const Routing: FC = () => (
  <Router>
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </Router>
);

export default Routing;
