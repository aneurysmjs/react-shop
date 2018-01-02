import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { func, string, bool } from 'prop-types';

import RmSearcher from 'Components/RmSearcher/RmSearcher';

export default class RmHeader extends Component {

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
      <div className="container my-3">
        <nav className="nav justify-content-between">
          <span className="navbar-brand">
            React Movies
          </span>
          <div className="form-inline my-2 my-lg-0">
            {space}
          </div>
        </nav>
      </div>
    );
  }

}

RmHeader.propTypes = {
  showSearch: bool,
  searchTerm: string,
  onSearch: func
};