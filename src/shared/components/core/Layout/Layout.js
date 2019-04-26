// @flow strict
import React from 'react';
import type { Node } from 'react';

import Footer from '@/components/core/Footer/Footer';
import Nav from '@/components/core/Nav/Nav';

import './Layout.scss';

type PropsType = {
  children: Node
};

const Layout = (props: PropsType) => (
  <div className="layout">
    <Nav />
    <div className="layout__content">
      { props.children }
    </div>
    <Footer />
  </div>
);

export default Layout;
