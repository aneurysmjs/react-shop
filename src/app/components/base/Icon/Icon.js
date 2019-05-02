// @flow strict
import React, { useState } from 'react';

import './Icon.scss';

type PropsType = {
  name: string,
  selected?: string,
  size: number | string
};

const Icon = ({ name, size }: PropsType) => {
  const [iconPath, setIconPath] = useState('');
  (async () => {
    // $FlowIgnore
    const icon = await import(`@/assets/svg/icons/${name}.svg`);
    setIconPath(icon.default);
  })();

  return (
    <img
      alt={`icon ${name}`}
      className="icon"
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      src={iconPath}
    />
  );
};

Icon.defaultProps = {
  size: 16,
};

export default Icon;
