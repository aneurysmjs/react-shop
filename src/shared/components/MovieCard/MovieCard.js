import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

import './MovieCard.scss';

export default class MovieCard extends PureComponent {

  render() {

    const { title, movieGenre, release_date, overview, id } = this.props;

    return (
      <article className="movieCard">
        <div className="card">
          <div className="card-body">
            <h4
              className="card-title movieCard__title movieCard__text-clamp"
            >
              {title}
            </h4>
            <p className="card-text text-clamp">
              {overview}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {release_date}
            </li>
            <li className="list-group-item">
              {movieGenre}
            </li>
          </ul>
          <NavLink to={`details/${id}`}>
            See Details
          </NavLink>
        </div>
      </article>

    );

  }
  
}