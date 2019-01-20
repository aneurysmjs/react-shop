import React from 'react';
import {
  Route
} from 'react-router-dom';

import { Nav } from 'components/Nav';
import Footer from 'components/Footer/Footer';

const Loading = () => (<div>...</div>);

import Landing from 'pages/Landing/Landing';

import About from 'pages/About/About';

import Movies from 'pages/Movies/Movies';

import Profile from 'pages/Profile/Profile';

import MovieDetails from 'pages/MovieDetails/MovieDetails';

const Routing = () => (
  <main>
    <Nav />
    <div>
      <Route exact path="/" component={Landing} />
      <Route
        path="/about"
        component={props => <About {...props} />}
      />
      <Route
        path="/movies"
        component={props => <Movies {...props} />}
      />
      <Route
        path="/Profile"
        component={props => <Profile {...props} />}
      />
      <Route
        path="/details/:id"
        component={props => <MovieDetails {...props} /> }
      />
    </div>
    <Footer />
  </main>
);

export default Routing;
