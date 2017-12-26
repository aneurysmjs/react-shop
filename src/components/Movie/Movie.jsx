import React from 'react';

const Movie = ({ movieTitle, description }) => (
  <div className="card" style={ {width: '20rem'} }>
    <div className="card-body">
      <h4 className="card-title">{ movieTitle }</h4>
      <p className="card-text">{ description }</p>
      <a href="#" className="btn btn-primary">Watch Trailer</a>
    </div>
  </div>
);

export default Movie;