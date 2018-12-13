import React from 'react';
import {
  Route
} from 'react-router-dom';

import RmFooter from '../../components/RmFooter/RmFooter';

const Loading = () => (<div>...</div>);

import RmLanding from '../../containers/RmLanding/RmLanding';

import RmAbout from '../../containers/RmAbout/RmAbout';

import RmMovies from '../../containers/RmMovies/RmMovies';

import RmProfile from '../../containers/RmProfile/RmProfile';

import RmMovieDetails from '../../containers/RmMovieDetails/RmMovieDetails';

const RmRoot = () => (
  <main>
    <div>
      <Route exact path="/" component={RmLanding} />
      <Route
        path="/about"
        component={props => <RmAbout {...props} />}
      />
      <Route
        path="/movies"
        component={props => <RmMovies {...props} />}
      />
      <Route
        path="/Profile"
        component={props => <RmProfile {...props} />}
      />
      <Route
        path="/details/:id"
        component={props => <RmMovieDetails {...props} /> }
      />
    </div>
    <RmFooter />
  </main>
);

export default RmRoot;
