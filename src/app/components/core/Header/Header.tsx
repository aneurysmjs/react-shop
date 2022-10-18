import React, { FunctionComponent } from 'react';

import Navigation from '~/components/core/Navigation';
import UserMenu from '~/components/core/UserMenu';

const Header: FunctionComponent = () => (
  <div className="d-flex vw-100 justify-content-between border-bottom bg-white">
    <Navigation />
    <UserMenu />
  </div>
);

export default Header;
