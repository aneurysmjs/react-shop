// @flow strict
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// $FlowIgnore
import { connect } from 'react-redux';

type StateType = {
  links: Array<{
    id: string,
    path: string,
    name: string,
  }>
};
class Nav extends Component<{}, StateType> {

  state = {
    links: [],
  };

  render() {
    const { links } = this.state;
    return (
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <NavLink
          to="/"
          className="navbar-brand"
        >
          Shop
        </NavLink>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            { links.length ? links.map(({ path, name, id }) => (
              <li key={id} className="nav-item">
                <NavLink
                  to={`/${path}`}
                  key={id}
                  activeClassName="active"
                  className="nav-link">
                  {name}
                </NavLink>
              </li>
            )) : null }
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCountry: state.selectedCountry
});

export default connect(mapStateToProps)(Nav);
