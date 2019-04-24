import React from 'react';
import {
  Route
} from 'react-router-dom';

import { Nav } from 'components/Nav';

import Footer from 'components/Footer/Footer';

import Home from 'pages/Home/Home';

const Loading = () => (<div>...</div>);

const Routing = () => (
  <main>
    <Nav />
    <div>
      <Route exact path="/" component={Home} />
    </div>
    <Footer />
  </main>
);

export default Routing;
