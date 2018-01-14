import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Loadable from 'react-loadable';

import RmFooter from '../../components/RmFooter/RmFooter';

const Loading = () => (<div>...</div>);

const RmLanding = Loadable({
  loader: () => import('../../containers/RmLanding/RmLanding'),
  loading: Loading
});

const RmAbout = Loadable({
  loader: () => import('../../containers/RmAbout/RmAbout'),
  loading: Loading
});

const RmMovies = Loadable({
  loader: () => import('../../containers/RmMovies/RmMovies'),
  loading: Loading
});

const RmProfile = Loadable({
  loader: () => import('../../containers/RmProfile/RmProfile'),
  loading: Loading
});

const RmMovieDetails = Loadable({
  loader: () => import('../../containers/RmMovieDetails/RmMovieDetails'),
  loading: Loading
});

const RmRoot = ({ store }) => (
  <Provider store={store}>
    <Router>
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
    </Router>
  </Provider>
);

export default RmRoot;
