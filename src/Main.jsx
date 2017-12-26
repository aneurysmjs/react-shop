import React from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// import main CSS styles
import './assets/scss/styles.scss';
import movies from './assets/json/movies.json';

import Landing from './containers/Landing/Landing';
import Movies from './containers/Movies/Movies';
import MovieDetails from './containers/MovieDetails/MovieDetails';
import Footer from './components/Footer/Footer';

class MainComponent extends React.Component {

  render() {
    return (
      <Router>
        <main>
          <div>
            <Route exact path="/" component={Landing} />
            <Route
              path="/movies"
              component={props => <Movies movies={movies} {...props} />}
            />
            <Route
              path="/details/:id"
              component={props => {
                const { match: { params } } = props;
                const movie = movies.filter(({ id }) => +params.id === id)[0];
                return <MovieDetails movie={movie} {...props} />;
              }}
            />
          </div>
          <Footer />
        </main>
      </Router>
    );
  }
  
}

ReactDom.render(<MainComponent />, document.querySelector('#app'));