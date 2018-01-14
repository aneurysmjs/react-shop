import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import RmLanding from '../../containers/RmLanding/RmLanding';
import RmAbout from '../../containers/RmAbout/RmAbout';
import RmMovies from '../../containers/RmMovies/RmMovies';
import RmProfile from '../../containers/RmProfile/RmProfile';
import RmMovieDetails from '../../containers/RmMovieDetails/RmMovieDetails';
import RmFooter from '../../components/RmFooter/RmFooter';

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
