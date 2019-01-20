import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './MovieCard.scss';

export default class MovieCard extends Component {

  render() {

    let { title, movieGenre, release_date, overview, id } = this.props;

    return (
      <article className="movieCard">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-text text-clamp">
              {overview}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{release_date}</li>
            <li className="list-group-item">{movieGenre}</li>
          </ul>
        </div>

        <NavLink to={`details/${id}`}>
          See Details
        </NavLink>
      </article>

    );

  }
  
}