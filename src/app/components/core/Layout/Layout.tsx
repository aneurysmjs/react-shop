import { Node } from React from 'react';


import Footer from '~/components/core/Footer';
import Header from '~/components/core/Header';

import './Layout.scss';

type PropsType = {
  children: Node;
};

const Layout = (props: PropsType) => (
  <div className="layout">
    <Header />
    <div className="layout__content container-fluid">{props.children}</div>
    <Footer />
  </div>
);

export default Layout;