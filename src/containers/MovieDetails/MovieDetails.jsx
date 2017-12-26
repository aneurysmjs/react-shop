import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import Movie from '../../components/Movie/Movie';

export default class MovieDetails extends Component {

  constructor() {
    super();
  }

  render() {
    const { movie } = this.props;
    return (
      <div>
        <Header />
        <div className="movieDetails d-flex flex-column align-items-center justify-content-center">
          <Movie {...movie} />
        </div>
      </div>
    );
  }
  
}