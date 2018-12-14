import React from 'react';

import './Header.scss';

const Header = ({ heading, subHeading, imgUrl = '' }) => (
  <header className="Header__masthead" style={{'background': imgUrl}}>
    <div className="Header__overlay" />
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="Header__page-heading">
            <h1>{ heading }</h1>
            <span className="Header__subheading">{subHeading}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;