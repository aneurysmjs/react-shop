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
  const svgPath = `@/assets/svg/icons/${name}.svg`;
  (async () => {
    try {
      // $FlowIgnore
      const icon = await import(svgPath);
      setIconPath(icon.default);
    // eslint-disable-next-line no-empty
    } catch (err) {
    }
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
