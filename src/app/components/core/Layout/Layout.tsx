import React, { FunctionComponent } from 'react';

import Footer from '~/components/core/Footer';
import Header from '~/components/core/Header';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
const Layout: FunctionComponent = ({ children }) => (
  <div className="d-flex flex-column vh-100">
    <Header />
    <div className="flex-grow-1 container-fluid">{children}</div>
    <Footer />
  </div>
);

export default Layout;
