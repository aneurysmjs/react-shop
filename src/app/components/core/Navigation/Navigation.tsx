import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

type Links = Array<{
  id: string;
  path: string;
  name: string;
}>;

const links: Links = [];

const Navigation: FunctionComponent = () => {
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
                  <NavLink to={`/${path}`} key={id} className="nav-link">
                    {name}
                  </NavLink>
                </li>
              ))
            : null}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
