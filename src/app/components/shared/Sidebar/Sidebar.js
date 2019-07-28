// @flow strict
import React, { Fragment, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  const asideRef = useRef<null>(null);

  const toggleSidebar = (): void => {
    // avoid 'sketchy' null
    if (asideRef.current) {
      asideRef.current.classList.toggle(`sidebar--open-${side}`);
    }
  };

  const closeSidebar = (): void => {
    toggleSidebar();
    setTimeout(onClose, 100);
  };

  useEffect(() => {
    // @link https://stackoverflow.com/questions/53834672/flow-type-keydown-event
    const handleKeyDown = (evt: KeyboardEvent): void => {
      if (isOpen && evt.keyCode === KEYBOARD.ESCAPE_KEY) {
        onClose();
      }
    };

    if (isOpen) {
      setTimeout(toggleSidebar, 100);
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return isOpen
    ? createPortal(
      <Fragment>
        <div
          onKeyPress={() => {}}
          role="presentation"
          onClick={closeSidebar}
          className="sidebar__overlay"
        />
        <aside
          // $FlowFixMe
          ref={asideRef}
          className={`sidebar sidebar--${side}`}
        >
          <header className="sidebar__header">
            <h3 className="sidebar__title">{ title }</h3>
            <span
              className="sidebar__close"
              tabIndex="-1"
              role="button"
              onKeyPress={() => {}}
              onClick={closeSidebar}
            >
              <Icon path="icons/close" />
            </span>
          </header>
          <div className="sidebar__content">
            {children}
          </div>
        </aside>
      </Fragment>,
      // $FlowFixMe
      document.body,
    ) : null;
};

export default Sidebar;
