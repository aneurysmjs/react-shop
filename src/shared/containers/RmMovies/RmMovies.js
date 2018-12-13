import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, string, number } from 'prop-types';

import { setSearchTerm, getMovies } from '../../actions';
import RmNav from '../RmNav/RmNav';
import MovieCard from '../../components/RmMovieCard/RmMovieCard';

import './RmMovies.scss';

class RmMovies extends Component {

  /**
   * Sets state's searchTerm and filter the movies.
   *
   * @param {string} searchTerm
   * @return {void}
   */
  searchTermHandler = (searchTerm) => {
    this.props.setSearchTerm(searchTerm);
  };

  componentDidMount() {

    console.log('this.props', this.props);
    if (this.props.movies.length === 0) {
      
    }

  }

  componentDidUpdate() {

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
  getMovies,
  setSearchTerm,  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RmMovies);