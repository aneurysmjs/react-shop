import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, string, number } from 'prop-types';

import { setSearchTerm, getMovies } from '../../actions';

import MovieCard from 'components/MovieCard/MovieCard';

import './Movies.scss';

class Movies extends Component {

  /**
   * Sets state's searchTerm and filter the movies.
   *
   * @param {string} searchTerm
   * @return {void}
   */
  searchTermHandler = (searchTerm) => {
    const { setSearchTerm } = this.props;
    setSearchTerm(searchTerm);
  };

  componentDidMount() {
    const { movies, fetchMovies } = this.props;
    if (movies.length === 0) {
      fetchMovies('movie/popular');
    }

  }

  componentDidUpdate() {

  }

  render() {

    const { searchTerm, movies } = this.props;

    return (
      <section>
        <div className="px-3">
          <div className="d-flex align-items-start justify-content-between flex-wrap">
            {movies.filter(movie => (
              `${movie.movieTitle} ${movie.description}`.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0
            )).map(movie => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </div>
      </section>
    );

  }

  
}

const mapStateToProps = (state) => ({
  searchTerm: state.searchTerm,
  movies: state.movies
});

const mapDispatchToProps = { 
  fetchMovies: getMovies,
  setSearchTerm,  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);