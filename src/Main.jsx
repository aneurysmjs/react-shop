import React from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// import main CSS styles
import './assets/scss/styles.scss';

import Landing from './pages/Landing/Landing';
import Movies from './pages/Movies/Movies';
import Footer from './components/Footer/Footer';

class MainComponent extends React.Component {

  render() {
    return (
      <Router>
        <main>
          <div>
            <Route exact path="/" component={Landing} />
            <Route path="/movies" component={Movies} />
          </div>
          <Footer />
        </main>
      </Router>
    );
  }
  
}

ReactDom.render(<MainComponent />, document.querySelector('#app'));