// @flow strict
import React from 'react';

import './Spinner.scss';

type PropsType = {
  height: number | string,
  width: number | string,
};

const Spinner = ({ height, width }: PropsType) => (
  <div
    style={{
      height: `${height}px`,
      width: `${width}px`,
    }}
    className="spinner"
  >
    <div className="spinner__outer-circle" />
    <div className="spinner__inner-circle" />
  </div>
);

Spinner.defaultProps = {
  height: '24',
  width: '24',
};

export default Spinner;
