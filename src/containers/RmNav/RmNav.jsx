import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { func, string, bool } from 'prop-types';
import { connect } from 'react-redux';

import RmSearcher from '../../components/RmSearcher/RmSearcher';

class RmNav extends Component {

  constructor(props) {
    super(props);
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

  render() {

    const {
      searchTerm,
      showSearch,
      onSearch
    } = this.props;

    let space;

    if (showSearch) {
      space = <RmSearcher searchTerm={searchTerm} onSearch={onSearch} />;
    } else {
      space = (
        <NavLink
          to='/movies'
          className="navbar-brand">
          Back
        </NavLink>
      );
    }

    return (
      <div className="mb-3">
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <NavLink
            to="/"
            className="navbar-brand">
            React Movies
          </NavLink>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink
                  to="/"
                  activeClassName="active"
                  className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/movies"
                  activeClassName="active"
                  className="nav-link">
                  Movies
                </NavLink>
              </li>
            </ul>
            <div className="form-inline">
              {space}
            </div>
          </div>

        </nav>
      </div>
    );
  }

}

RmNav.propTypes = {
  showSearch: bool,
  searchTerm: string,
  onSearch: func
};

const mapStateToProps = (state) => ({
  selectedCountry: state.selectedCountry
});

export default connect(mapStateToProps)(RmNav);
