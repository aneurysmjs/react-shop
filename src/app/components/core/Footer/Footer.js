// @flow strict
import React from 'react';

import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__copyright">
        <p>Copyright © {new Date().getFullYear()}. All Rights Reserved</p>
      </div>
    </div>
  </footer>
);

export default Footer;
