// @flow strict
import React, { Fragment, useEffect } from 'react';
import type { Node } from 'react';

import Icon from '@/components/base/Icon/Icon';
import { KEYBOARD } from '@/constants';

import './Sidebar.scss';

type PropsType = {
  isOpen?: boolean,
  side?: string,
  onClose: () => void,
  title?: string,
  children: Node,
};

const Sidebar = ({
  isOpen = false,
  side = 'right',
  onClose = () => {},
  title = 'sidebar',
  children,
}: PropsType) => {
  useEffect(() => {
    const handle = (evt: KeyboardEvent): void => {
      if (isOpen && evt.keyCode === KEYBOARD.ESCAPE_KEY) {
        onClose();
      }
    };

    document.addEventListener('keydown', handle);

    return () => {
      document.removeEventListener('keydown', handle);
    };
  });

  return isOpen
    ? (
      <Fragment>
        <div
          onKeyPress={() => {}}
          role="presentation"
          onClick={onClose}
          className="sidebar__overlay"
        />
        <aside
          className="sidebar"
          style={{
            [side]: isOpen ? 0 : '-300px',
          }}
        >
          <header className="sidebar__header">
            <h3 className="sidebar__title">{ title }</h3>
            <span
              className="sidebar__close"
              tabIndex="-1"
              role="button"
              onKeyPress={() => {}}
              onClick={onClose}
            >
              <Icon path="icons/close" />
            </span>
          </header>
          <div className="sidebar__content">
            {children}
          </div>
        </aside>
      </Fragment>
    ) : null;
};

export default Sidebar;
