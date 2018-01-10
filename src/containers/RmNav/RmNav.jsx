import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { func, string, bool } from 'prop-types';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';

import RmSearcher from '../../components/RmSearcher/RmSearcher';

class RmNav extends Component {

  /**
   * Sets state's searchTerm and filter the movies.
   *
   * @param {string} searchTerm
   * @return {void}
   */
  searchTermHandler = (searchTerm) => {
    this.setState({searchTerm});
  };

  links = [
    {
      id: v4(),
      path: 'about',
      name: 'About'
    },
    {
      id: v4(),
      path: 'movies',
      name: 'Movies'
    }
  ];

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
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
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
            {this.links.map(({ path, name, id}) => (
              <li key={id} className="nav-item">
                <NavLink
                  to={`/${path}`}
                  key={id}
                  activeClassName="active"
                  className="nav-link">
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="form-inline">
            {space}
          </div>
        </div>
      </nav>
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
