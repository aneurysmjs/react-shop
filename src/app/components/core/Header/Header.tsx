import React from 'react';

import Navigation from '~/components/core/Navigation';
import UserMenu from '~/components/core/UserMenu';

import './Header.scss';

const Header = (): React.ReactElement => (
  <div className="header">
    <Navigation />
    <UserMenu />
  </div>
);
export default Header;
