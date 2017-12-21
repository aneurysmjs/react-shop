import React from 'react';

import movies from '../../assets/json/movies.json';
import MovieCard from '../../components/MovieCard/MovieCard';
import Searcher from '../../components/Searcher/Searcher';

export default class Movies extends React.Component {

  constructor() {
    super();

    /**
     * Movies's state, search term to filter the movies that match that criteria.
     */
    this.state = {
      searchTerm: ''
    };

    this.searchTermHandler = this.searchTermHandler.bind(this);
  }

  render() {
    return (
      <section>
        <Searcher searchTerm={this.state.searchTerm} onSearch={this.searchTermHandler} />
        <div className="d-flex align-items-start justify-content-between flex-wrap">
          {movies.filter(movie => {
            return `${movie.movieTitle} ${movie.description}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0;
          }).map(movie => (
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