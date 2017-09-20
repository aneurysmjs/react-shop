import React from 'react';
import './Landing.scss';
import { Link } from 'react-router-dom';

export default class Landing extends React.Component {

  constructor() {
    super();
  }

  render () {
    return (
      <div className='Landing d-flex flex-column align-items-center justify-content-center'>
        <h1>Movie Search</h1>
        <Link to="movies">
          <button type="button" className="btn btn-primary">
            See all movies
          </button>
        </Link>
      </div>
    );
  }

}