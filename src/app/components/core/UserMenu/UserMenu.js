// @flow strict
import React, { useState } from 'react';
// $FlowFixMe
import { useSelector } from 'react-redux';

import Icon from '@/components/base/Icon/Icon';
import { useLazy } from '@/hooks/useLazy';
import { getCart } from '@/store/reducers/cart';

import type { CartType } from '@/store/types/CartType';

import './UserMenu.scss';

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const cart: CartType = useSelector(getCart);

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
        className="user-menu__cart-icon"
        tabIndex="-1"
        role="button"
        onKeyPress={() => {}}
        onClick={handleOpen}
      >
        <Icon
          size="20"
          path="icons/cart"
        />
        <span className="user-menu__cart-quantity">
          ({ cart.quantity })
        </span>
      </span>
    </div>
  );
};

export default UserMenu;
