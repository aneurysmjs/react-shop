import React, { Component } from 'react';

import Header from '../../components/RmHeader/RmHeader';
import RmMovie from '../../components/RmMovie/RmMovie';

export default class RmMovieDetails extends Component {

  constructor() {
    super();
  }

  render() {
    const { movie } = this.props;
    return (
      <div>
        <Header />
        <div className="movieDetails d-flex flex-column align-items-center justify-content-center">
          <RmMovie {...movie} />
        </div>
      </div>
    );
  }
  
}