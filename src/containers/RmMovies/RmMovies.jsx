import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, string, number } from 'prop-types';

import { setSearchTerm, getMovies } from '../../actions';
import RmNav from '../RmNav/RmNav';
import MovieCard from '../../components/RmMovieCard/RmMovieCard';

class RmMovies extends Component {

  constructor(props) {
    super(props);

    this.searchTermHandler = this.searchTermHandler.bind(this);

  }

  componentWillMount() {

    if (!this.props.movies.length) {
      this.props.dispatch(getMovies(`../../assets/json/movies.json`));
    }

  }

  render() {

    const { searchTerm, movies } = this.props;

    return (
      <section>
        <RmNav
          showSearch={true}
          searchTerm={searchTerm}
          onSearch={this.searchTermHandler}
        />
        <div className="px-3">
          <div className="d-flex align-items-start justify-content-between flex-wrap">
            {movies.filter(movie => (
              `${movie.movieTitle} ${movie.description}`.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0
            )).map(movie => (
              <MovieCard {...movie} key={movie.id} />
            ))}
          </div>
        </div>
      </section>
    );

  }

  /**
   * Sets state's searchTerm and filter the movies.
   *
   * @param {string} searchTerm
   * @return {void}
   */
  searchTermHandler(searchTerm) {
    this.props.dispatch(setSearchTerm(searchTerm));
  }
  
}

const mapStateToProps = (state) => ({
  searchTerm: state.searchTerm,
  movies: state.movies
});

export default connect(mapStateToProps)(RmMovies);