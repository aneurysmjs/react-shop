import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// store
import store from './store';

// import main CSS styles
import './assets/scss/styles.scss';

import RmLanding from 'Containers/RmLanding/RmLanding';
import RmMovies from 'Containers/RmMovies/RmMovies';
import RmMovieDetails from 'Containers/RmMovieDetails/RmMovieDetails';
import RmFooter from 'Components/RmFooter/RmFooter';

class MainComponent extends React.Component {

  render() {
    return (
      <Router>
        <Provider store={store}>
          <main>
            <div>
              <Route exact path="/" component={RmLanding} />
              <Route
                path="/movies"
                component={props => <RmMovies {...props} />}
              />
              <Route
                path="/details/:id"
                component={props => {
                  const { match: { params } } = props;
                  const movie = movies.filter(({ id }) => +params.id === id)[0];
                  return <RmMovieDetails movie={movie} {...props} />;
                }}
              />
            </div>
            <RmFooter />
          </main>
        </Provider>
      </Router>
    );
  }
  
}

ReactDom.render(<MainComponent />, document.querySelector('#app'));