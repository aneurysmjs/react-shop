import type { FC } from 'react';
import { useTranslations } from 'next-intl';

const Home: FC = () => {
  const t = useTranslations('app.home');

  return (
    <div
      className={`
        grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20

        font-[family-name:var(--font-geist-sans)]

        sm:p-20
      `}
    >
      <main
        className={`
          flex items-center

          sm:items-start
        `}
      >
        <h1
          className={`
            text-center text-3xl

            font-[family-name:var(--font-geist-mono)]
          `}
        >
          <p>{t('title')}</p>
        </h1>
      </main>
    </div>
  );
};

export default Home;
