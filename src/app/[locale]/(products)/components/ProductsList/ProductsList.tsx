import type { FC } from 'react';

import { getProducts } from '@/app/[locale]/(products)/services/productsService';
import productsAdapter from '@/app/[locale]/(products)/adapters/productsAdapter';
import ProductCard from '@/app/[locale]/(products)/components/ProductCard';

interface ProductListProps {
  className?: string;
}

const ProductList: FC<ProductListProps> = async () => {
  const productsResponse = await getProducts();

  const products = productsAdapter(productsResponse);

  return (
    <div className="container mx-auto flex flex-wrap items-center pb-12 pt-4">
      <nav aria-label="store" className="top-0 z-30 w-full px-6 py-1">
        <div
          className={`
            container mx-auto mt-0 flex w-full flex-wrap items-center
            justify-between px-2 py-3
          `}
        >
          <a
            className={`
              text-xl font-bold uppercase tracking-wide no-underline

              hover:no-underline
            `}
            href="#"
          >
            Store
          </a>

          <div className="flex items-center" id="store-nav-content">
            <a
              className={`
                inline-block pl-3 no-underline

                hover:text-black
              `}
              href="#"
            >
              <svg
                className={`
                  fill-current

                  hover:text-black
                `}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
              </svg>
            </a>

            <a
              className={`
                inline-block pl-3 no-underline

                hover:text-black
              `}
              href="#"
            >
              <svg
                className={`
                  fill-current

                  hover:text-black
                `}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {products.map((product, i) => (
        <div
          key={i}
          className={`
            flex w-full flex-col p-6

            md:w-1/3

            xl:w-1/4
          `}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
