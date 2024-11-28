import type { FC } from 'react';

import ProductCard from '@/modules/home/components/ProductCard';
import useGetProducts from './hooks/useGetProducts';

const Home: FC = () => {
  const { data } = useGetProducts();

  return (
    <div className="bg-theme">
      <div
        className={`
          relative mx-auto flex max-w-3xl flex-col items-center px-6 py-8
          text-center

          lg:px-0

          sm:py-16
        `}
      >
        <h1
          className={`
            text-4xl font-bold tracking-tight theme-text

            lg:text-6xl
          `}
        >
          New arrivals are here
        </h1>
      </div>
      <div
        className={`
          mx-auto max-w-2xl px-4 py-8

          lg:max-w-7xl lg:px-8

          sm:px-6 sm:py-16
        `}
      >
        <h2 className="text-2xl font-bold tracking-tight theme-text">Customers also purchased</h2>
        <div
          className={`
            mt-6 grid grid-cols-1 gap-x-6 gap-y-10

            lg:grid-cols-4

            sm:grid-cols-2

            xl:gap-x-8
          `}
        >
          {data?.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
