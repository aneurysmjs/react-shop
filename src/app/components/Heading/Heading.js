// @flow strict
import React from 'react';

import './Heading.scss';

type PropsType = {
  heading?: string,
  subHeading?: string,
  imgUrl?: string,
}

const Heading = ({ heading, subHeading, imgUrl = '' }: PropsType) => (
  <Heading
    className="Heading__masthead"
    style={{'background': imgUrl}}
  >
    <div className="Heading__overlay" />
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="Heading__page-heading">
            <h1>{ heading }</h1>
            <span className="Heading__subheading">
              {subHeading}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Heading>
);

export default Heading;