/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, FunctionComponent } from 'react';
import Icon from '~/components/base/Icon';

import Sidebar from '~/components/common/Sidebar';
import './UserMenu.scss';

const UserMenu: FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => setOpen(!open);

  // const Sidebar = useLazy(
  //   // @ts-ignore
  //   () => import(/* webpackChunkName: "Sidebar" */ '~/components/common/Sidebar'),
  //   open,
  // );

  return (
    <div className="user-menu">
      {Sidebar ? (
        // TODO: fix typing for future releases
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Sidebar title="Cart" side="right" isOpen={open} onClose={handleOpen}>
          <p className="lead">You have nothing, let&apos;s shop!</p>
        </Sidebar>
      ) : null}
      <span
        className="user-menu__cart-icon"
        tabIndex={-1}
        role="button"
        onKeyPress={(): void => {}}
        onClick={handleOpen}
      >
        <Icon size="20" path="icons/cart" />
        {/* <span className="user-menu__cart-quantity">({cart.quantity})</span> */}
      </span>
    </div>
  );
};

export default UserMenu;
