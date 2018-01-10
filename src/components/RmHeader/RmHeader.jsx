import React from 'react';

/**
 *
 * @param {String} heading
 * @param {String} subHeading
 * @param {String} imgUrl
 * @return {component}
 * @constructor
 */
const RmHeader = ({ heading, subHeading, imgUrl = '' }) => (

  <header className="rmHeader__masthead" style={{'background': imgUrl}}>
    <div className="rmHeader__overlay" />
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="rmHeader__page-heading">
            <h1>{ heading }</h1>
            <span className="rmHeader__subheading">{subHeading}</span>
          </div>
        </div>
      </div>
    </div>
  </header>

);

export default RmHeader;