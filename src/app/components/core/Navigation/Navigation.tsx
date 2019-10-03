/* eslint-disable prettier/prettier */
import React from 'react';
import { NavLink } from 'react-router-dom';

type Links = Array<{
  id: string;
  path: string;
  name: string;
}>;

const links: Links = [];

function Navigation(): React.ReactElement {
  return (
    <nav className="navbar navbar-expand-lg">
      <NavLink to="/" className="navbar-brand">
        Shop
      </NavLink>
      <button className="navbar-toggler navbar-toggler-right" type="button">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {links.length
            ? links.map(({ path, name, id }) => (
              <li key={id} className="nav-item">
                <NavLink to={`/${path}`} key={id} activeClassName="active" className="nav-link">
                  {name}
                </NavLink>
              </li>
            ))
            : null}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
