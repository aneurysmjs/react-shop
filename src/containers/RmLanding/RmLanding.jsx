import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { COUNTRIES } from '../../constants/Urls';
import api from 'api';
import { setSelectedCountry } from '../../actions';

class RmLanding extends Component {

  constructor() {
    super();

    this.state = {
      countries: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @async
   * @return {Promise<void>}
   */
  async componentWillMount() {
    try {
      const { data } = await api.get(`${COUNTRIES}/all`);
      this.setState({countries: data});
    } catch (err) {
      throw new Error('ReactMovies: ', err);
    }
  }

  render () {
    const { countries } = this.state;
    const { selectedCountry } = this.props;

    return (
      <div className='RmLanding d-flex flex-column align-items-center justify-content-center'>
        <h1>Movie Search</h1>
        <form className="text-center col-md-4">
          <div className="form-group">
            <label htmlFor="countries">Select a Country</label>
            <select
              value={selectedCountry}
              className="form-control"
              onChange={this.handleChange}>
              {countries.map(({ name }) => (
                <option
                  id="countries"
                  key={name}
                  value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </form>
        <Link to="movies">
          <button type="button" className="btn btn-primary">
            See all movies
          </button>
        </Link>
      </div>
    );
  }

  /**
   *
   * @param {SyntheticEvent} evt
   * @return {void}
   */
  handleChange(evt) {
    const selectedCountry = evt.target.value;
    this.props.dispatch(setSelectedCountry(selectedCountry));
  }

}

const mapStateToProps = (state) => ({
  selectedCountry: state.selectedCountry
});

export default connect(mapStateToProps)(RmLanding);