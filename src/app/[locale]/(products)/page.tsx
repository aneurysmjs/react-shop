import type { FC } from 'react';
import { setRequestLocale } from 'next-intl/server';

import { useTranslations } from 'next-intl';
import ProductList from '@/app/[locale]/(products)/components/ProductsList';
import Shell from '@/components/common/Shell';

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
    <Shell className="max-w-6xl gap-0">
      <ProductList />
    </Shell>
  );
};

export default Home;
