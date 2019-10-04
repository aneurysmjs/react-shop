import React from 'react';

import Footer from '~/components/core/Footer';
import Header from '~/components/core/Header';

type PropsType = {
  children: JSX.Element | Array<JSX.Element>;
};

const Layout = (props: PropsType): JSX.Element => (
  <div className="d-flex flex-column vh-100">
    <Header />
    <div className="flex-grow-1 container-fluid">{props.children}</div>
    <Footer />
  </div>
);

export default Layout;
