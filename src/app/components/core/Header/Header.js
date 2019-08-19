// @flow strict
import React, { useState } from 'react';

import Navigation from '@/components/core/Navigation/Navigation';
import { UserMenu } from '@/components/core/UserMenu';
import { useLazy } from '@/hooks/useLazy';

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
      <UserMenu onClick={handleOpen} />
    </div>
  );
};

export default Header;
