import React from 'react';
import { Link } from 'react-router-dom';

import { COUNTRIES } from '../../constants/Urls';
import api from 'api';

export default class RmLanding extends React.Component {

  constructor() {
    super();

    this.state = {
      selectedCountry: 'Colombia',
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
    const { countries, selectedCountry } = this.state;

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
    this.setState({selectedCountry});
  }

}