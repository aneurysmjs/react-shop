/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useRef, ReactElement } from 'react';
import { createPortal } from 'react-dom';

import Icon from '~/components/base/Icon';
import { KEYBOARD } from '~/constants';

import './Sidebar.scss';

type PropsType = {
  isOpen?: boolean;
  side?: string;
  onClose?: () => void;
  title?: string;
  children: ReactElement | Array<ReactElement>;
};

const Sidebar = ({
  isOpen = false,
  side = 'right',
  onClose = (): void => {},
  title = 'sidebar',
  children,
}: PropsType): null | ReactElement => {
  const asideRef = useRef<HTMLElement>(null);

  const toggleSidebar = (): void => {
    // avoid 'sketchy' null
    if (asideRef.current) {
      asideRef.current.classList.toggle(`sidebar--open-${side}`);
    }
  };

  // @ts-ignore
  const delay = (cb: () => void): NodeJS.Timeout => setTimeout(cb, 100);

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

    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return isOpen
    ? createPortal(
      <Fragment>
        <div
          data-testid="overlay"
          onKeyPress={(): void => {}}
          role="presentation"
          onClick={closeSidebar}
          className={`sidebar__overlay sidebar__overlay--fade-${isOpen ? 'in' : 'out'}`}
        />
        <aside
          data-testid="sidebar"
          
          ref={asideRef}
          className={`sidebar sidebar--${side}`}
        >
          <header className="sidebar__header">
            <h3 className="sidebar__title">{title}</h3>
            <button
              data-testid="close"
              className="sidebar__close"
              tabIndex={-1}
              onKeyPress={(): void => {}}
              onClick={closeSidebar}
            >
              <Icon path="icons/close" />
            </button>
          </header>
          <div data-testid="content" className="sidebar__content">
            {children}
          </div>
        </aside>
      </Fragment>,
      document.body,
    )
    : null;
};

export default Sidebar;
