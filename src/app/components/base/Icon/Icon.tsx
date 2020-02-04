import React, { useState, useEffect, FunctionComponent } from 'react';

import './Icon.scss';

type PropsType = {
  path: string;
  selected?: string;
  size: number | string;
};

const Icon: FunctionComponent<PropsType> = ({ path, size }: PropsType) => {
  const [iconPath, setIconPath] = useState('');

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        // eslint-disable-next-line prettier/prettier
        const icon = await import(/* webpackChunkName: "Shop Icon" */ '~/assets/svg/' + path + '.svg'); // eslint-disable-line prefer-template
        setIconPath(icon.default);
        // eslint-disable-next-line no-empty
      } catch (err) {}
    })();
  }, [path]);

  return (
    <img
      alt={`icon ${path}`}
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
