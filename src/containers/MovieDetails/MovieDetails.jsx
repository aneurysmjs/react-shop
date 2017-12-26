import React, { Component } from 'react';

import Movie from '../../components/Movie/Movie';

export default class MovieDetails extends Component {

  constructor() {
    super();
  }

  render() {
    const { movie } = this.props;
    return (
      <div className="movieDetails d-flex flex-column align-items-center justify-content-center">
        <Movie {...movie} />
      </div>
    );
  }
  
}