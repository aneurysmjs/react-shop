import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, string, number } from 'prop-types';

import RmHeader from '../../components/RmHeader/RmHeader';
import MovieCard from '../../components/RmMovieCard/RmMovieCard';

class RmMovies extends Component {

  constructor(props) {
    super(props);

    this.searchTermHandler = this.searchTermHandler.bind(this);
  }

  render() {

    const { movies, searchTerm } = this.props;

    console.log('searchTerm', searchTerm);

    return (
      <section>
        <RmHeader
          showSearch={true}
          searchTerm={searchTerm}
          onSearch={this.searchTermHandler}
        />
        <div className="d-flex align-items-start justify-content-between flex-wrap">
          {movies.filter(movie => (
            `${movie.movieTitle} ${movie.description}`.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0
          )).map(movie => (
            /*
              we can also `spread` the object, is like taking everything inside of `movie` and spread it out
              so is the exact same as movie-title={movie.movieTitle}, country={movie.country} for every single thing
              in `movie`, this is not part of ES feature but that's JSX mimicking what ES does and spread it out
              over the entire object.
            */
            <MovieCard {...movie} key={movie.id} />
          ))}
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
    this.setState({searchTerm});
  }
  
}

RmMovies.propTypes = {
  movies: arrayOf(shape({
    id: number,
    movieTitle: string,
    country: string,
    description: string,
    movieGenre: string
  }))
};

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  };
};

export default connect(mapStateToProps)(RmMovies);