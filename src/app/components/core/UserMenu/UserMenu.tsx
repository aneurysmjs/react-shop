import React, { useState, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import Icon from '~/components/base/Icon';
import useLazy from '~/hooks/useLazy';

import { State } from '~/store/State';
import { AlienResult } from '~/store/config/alienStore/useAlien';
import { Cart } from '~/store/modules/cart/types';

import './UserMenu.scss';

type PropsType = {
  modules: Array<AlienResult<State>>;
};

const UserMenu: FunctionComponent<PropsType> = ({ modules }: PropsType) => {
  const [open, setOpen] = useState(false);
  const [cartModule] = modules;

  const { selectors } = cartModule;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const cart = useSelector<State, Cart>(selectors!.getCart);

  const handleOpen = (): void => setOpen(!open);

  const Sidebar = useLazy(
    () => import(/* webpackChunkName: "Sidebar" */ '~/components/common/Sidebar'),
    open,
  );

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
        <span className="user-menu__cart-quantity">({cart.quantity})</span>
      </span>
    </div>
  );
};

export default UserMenu;
