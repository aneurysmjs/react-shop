// @flow strict
import React, { Fragment } from 'react';
import type { Node } from 'react';
import './Sidebar.scss';

type PropsType = {
  isOpen?: boolean,
  side?: string,
  children: Node,
};

const Sidebar = ({
  isOpen = false,
  side = 'left',
  children,
}: PropsType) => (
  <Fragment>
    <div className="sidebar__overlay" />
    <aside
      className="sidebar"
      style={{
        [side]: isOpen ? 0 : '-200px',
      }}
    >
      <header className="sidebar__header">
        Sidebar
      </header>
      <div className="sidebar__content">
        {children}
      </div>
    </aside>
  </Fragment>
);

Sidebar.defaultProps = {
  side: 'left',
};

export default Sidebar;
