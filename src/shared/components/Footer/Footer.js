import React from 'react';

import './Footer.scss';

const Footer = () => (
  <footer className="footer sm-padding bg-dark">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="footer__logo">
            <img
              className="img-fluid"
              src="../../assets/img/react-logo.png"
              alt="react logo" />
          </div>
          <div className="footer__copyright">
            <p>Copyright © 2018. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
