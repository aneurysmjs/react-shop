import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import Icon from '~/components/base/Icon';
import useLazy from '~/hooks/useLazy';
import { getCart } from '~/store/modules/cart/selectors';

import { CartType } from '~/shared/types/CartType';

import './UserMenu.scss';

const UserMenu = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const cart: CartType = useSelector(getCart);

  const handleOpen = (): void => setOpen(!open);

  const Sidebar: React.ReactElement = useLazy({
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    getModule: (): Promise<any> => // eslint-disable-line @typescript-eslint/no-explicit-any
      import(/* webpackChunkName: "Sidebar" */ '~/components/common/Sidebar'),
    cond: open,
  });

  return (
    <div className="user-menu">
      {Sidebar ? (
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
        <span className="user-menu__cart-quantity">({cart.quantity})</span>
      </span>
    </div>
  );
};

export default UserMenu;
