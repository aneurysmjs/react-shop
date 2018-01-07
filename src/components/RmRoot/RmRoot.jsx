import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import RmLanding from '../../containers/RmLanding/RmLanding';
import RmMovies from '../../containers/RmMovies/RmMovies';
import RmMovieDetails from '../../containers/RmMovieDetails/RmMovieDetails';
import RmFooter from '../../components/RmFooter/RmFooter';

const RmRoot = ({ store }) => (
  <Provider store={store}>
    <Router>
      <main>
        <div>
          <Route exact path="/" component={RmLanding} />
          <Route
            path="/movies"
            component={props => <RmMovies {...props} />}
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