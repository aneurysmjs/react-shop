import React from 'react';
import { NavLink } from 'react-router';
import { string } from 'prop-types';

const Header = () => (
  <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">React Movies</a>
    </nav>
  </div>
);

export default Header;