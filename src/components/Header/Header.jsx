import React from 'react';
import { NavLink } from 'react-router-dom';
import { string } from 'prop-types';

const Header = () => (
  <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink
        to='/'
        className="navbar-brand">
        React Movies
      </NavLink>
    </nav>
  </div>
);

export default Header;