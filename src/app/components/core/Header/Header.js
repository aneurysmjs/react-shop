// @flow strict
import React from 'react';

import Icon from '@/components/base/Icon/Icon';
import Navigation from '@/components/core/Navigation/Navigation';

import './Header.scss';

const Header = () => (
  <div className="header">
    <Navigation />
    <span>
      <Icon path="icons/cart" />
    </span>
  </div>
);

export default Header;
