import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getMovie } from '../../actions';

import Movie from 'components/Movie/Movie';

import './MovieDetails.scss';

class MovieDetails extends Component {

  componentWillMount() {
    this.props.dispatch(getMovie('1'));
  }

  render() {

    const { movie } = this.props;

    return (
      <div>
        <div className="movieDetails d-flex flex-column align-items-center justify-content-center">
          <Movie {...movie} />
        </div>
      </div>
    );

  }
  
}

const mapStateToProps = (state) => ({
  movie: state.movie
});

export default connect(mapStateToProps)(MovieDetails);