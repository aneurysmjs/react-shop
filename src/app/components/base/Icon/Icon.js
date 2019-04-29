// @flow strict
import React from 'react';

import './Icon.scss';

type PropsType = {
  name: string,
  selected?: string,
};

const Icon = ({ name, selected }: PropsType) => (
  <imgx
    alt="icon"
    className="icon"
    src={`assets/svg/icons/${name}${selected ? '-selected' : ''}.svg`}
  />
);

export default Icon;
