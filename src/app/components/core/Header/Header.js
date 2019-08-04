// @flow strict
import React, { useState } from 'react';

import Icon from '@/components/base/Icon/Icon';
import Navigation from '@/components/core/Navigation/Navigation';
import { useLazy } from '@/components/shared/LazyComponent/LazyComponent';

import './Header.scss';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const Sidebar = useLazy(
    () => import(/* webpackChunkName: "Sidebar" */'@/components/shared/Sidebar/Sidebar'),
    open,
  );

  return (
    <div className="header">
      {Sidebar
        ? (
          <Sidebar
            title="Cart"
            side="right"
            isOpen={open}
            onClose={handleOpen}
          >
            <p className="lead">
              You have nothing, let&apos;s shop!
            </p>
          </Sidebar>)
        : null}
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
