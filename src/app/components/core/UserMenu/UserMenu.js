// @flow strict
import React from 'react';

import Icon from '@/components/base/Icon/Icon';

import './UserMenu.scss';

type PropsType = {
  onClick?: () => void,
};

const UserMenu = ({
  onClick = () => {},
}: PropsType) => (
  <div className="user-menu">
    <span
      tabIndex="-1"
      role="button"
      onKeyPress={() => {}}
      onClick={onClick}
    >
      <Icon
        size="20"
        path="icons/cart"
      />
    </span>
  </div>
);

export default UserMenu;
