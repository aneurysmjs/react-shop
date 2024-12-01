import type { FC, PropsWithChildren, ReactNode } from 'react';

import Header from '@/components/core/Header';
import Footer from '@/components/core/Footer';

type ProductsLayoutProps = PropsWithChildren<{
  modal: ReactNode;
}>;

const ProductsLayout: FC<ProductsLayoutProps> = ({ children, modal }) => {
  // const user = await getCachedUser();

  return (
    // <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
        {modal}
      </main>
      <Footer />
    </div>
  );
};

export default ProductsLayout;
