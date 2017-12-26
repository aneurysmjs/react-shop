import React from 'react';
import { NavLink } from 'react-router-dom';

export default class MovieCard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    // Destructure the individual props
    let { movieTitle, movieGenre, country, description, id } = this.props;

    return (
      <article className="movieCard">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{movieTitle}</h4>
            <p className="card-text text-clamp">
              {description}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{country}</li>
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