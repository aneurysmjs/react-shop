import type { FC } from 'react';
import { setRequestLocale } from 'next-intl/server';

import { useTranslations } from 'next-intl';
import ProductList from './(products)/components/ProductsList';

interface HomeProps {
  params: {
    locale: 'string';
  };
}

const Home: FC<HomeProps> = ({ params }) => {
  setRequestLocale(params.locale);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = useTranslations('app.home');

  return (
    <section>
      {/* <div
        className={`
          relative mx-auto flex max-w-3xl flex-col items-center px-6 py-8
          text-center

          lg:px-0

          sm:py-16
        `}
      >
        <h1
          className={`
            text-4xl font-bold tracking-tight

            lg:text-6xl
          `}
        >
          text
        </h1>
      </div> */}

      <ProductList />
    </section>
  );
};

export default Home;
