// @flow strict
import React, { useState } from 'react';

import Icon from '@/components/base/Icon/Icon';
import { useLazy } from '@/hooks/useLazy';

import './UserMenu.scss';

type PropsType = {
  onClick?: () => void,
};

const UserMenu = ({
  // eslint-disable-next-line no-unused-vars
  onClick = () => {},
}: PropsType) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const Sidebar = useLazy(
    () => import(/* webpackChunkName: "Sidebar" */'@/components/shared/Sidebar/Sidebar'),
    open,
  );

  return (
    <div className="user-menu">
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
  );
};

export default UserMenu;
