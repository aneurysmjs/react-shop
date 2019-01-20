import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { COUNTRIES } from '../../constants/Urls';
import { getCountries as getCountriesAction, setSelectedCountry } from '../../actions';

import './Landing.scss';

class Landing extends Component {

  /**
   *
   * @param {SyntheticEvent} evt
   * @return {void}
   */
  handleChange = (evt) => {
    const { setSelectedCountry } = this.props;
    const selectedCountry = evt.target.value;
    setSelectedCountry(selectedCountry);
  };

  componentDidMount() {
    const { countries, getCountries } = this.props;
    if (!countries.length) {
      getCountries(`${COUNTRIES}/all`);
    }
  }

  render () {

    const { selectedCountry, countries } = this.props;

    return (
      <div className='Landing d-flex flex-column align-items-center justify-content-center'>
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

}

const mapStateToProps = (state) => ({
  selectedCountry: state.selectedCountry,
  countries: state.countries
});

const mapDispatchToProps = (dispatch) => ({
  getCountries(url) {
    dispatch(getCountriesAction(url));
  },
  setCountry(country) {
    dispatch(setSelectedCountry(country));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);