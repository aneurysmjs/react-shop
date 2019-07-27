// @flow strict
import React, { useState } from 'react';

import Icon from '@/components/base/Icon/Icon';
import Navigation from '@/components/core/Navigation/Navigation';
import Sidebar from '@/components/shared/Sidebar/Sidebar';

import './Header.scss';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="header">
      <Sidebar
        isOpen={open}
        onClose={handleOpen}
        title="Cart"
      >
        <p className="lead">
          You have nothing, let&apos;s shop!
        </p>
      </Sidebar>
      <Navigation />
      <div className="header__user-menu">
        <span
          tabIndex="-1"
          role="button"
          onKeyPress={() => {}}
          onClick={handleOpen}
        >
          <Icon
            size="20"
            path="icons/cart"
          />
        </span>
      </div>
    </div>
  );
};

export default Header;
