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
  onClose?: () => void,
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

  const delay = (cb: () => void): TimeoutID => setTimeout(cb, 100);

  const closeSidebar = (): void => {
    toggleSidebar();
    delay(onClose);
  };

  useEffect(() => {
    // @link https://stackoverflow.com/questions/53834672/flow-type-keydown-event
    const handleKeyDown = (evt: KeyboardEvent): void => {
      if (isOpen && evt.keyCode === KEYBOARD.ESCAPE_KEY) {
        onClose();
      }
    };

    if (isOpen) {
      delay(toggleSidebar);
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
          data-testid="overlay"
          onKeyPress={() => {}}
          role="presentation"
          onClick={closeSidebar}
          className={`sidebar__overlay sidebar__overlay--fade-${isOpen ? 'in' : 'out'}`}
        />
        <aside
          data-testid="sidebar"
          // $FlowFixMe
          ref={asideRef}
          className={`sidebar sidebar--${side}`}
        >
          <header className="sidebar__header">
            <h3 className="sidebar__title">{ title }</h3>
            <button
              data-testid="close"
              className="sidebar__close"
              tabIndex="-1"
              onKeyPress={() => {}}
              onClick={closeSidebar}
            >
              <Icon path="icons/close" />
            </button>
          </header>
          <div
            data-testid="content"
            className="sidebar__content"
          >
            {children}
          </div>
        </aside>
      </Fragment>,
      // $FlowFixMe
      document.body,
    ) : null;
};

export default Sidebar;
