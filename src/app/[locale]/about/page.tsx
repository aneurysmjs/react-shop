import type { FC } from 'react';
import { useTranslations } from 'next-intl';

const About: FC = () => {
  const t = useTranslations('app.about');

  return (
    <section className="grid h-full place-content-center">
      <article>
        <h2 className="mb-4 text-center text-4xl">{t('whatIsIt')}</h2>
        <p>{t('aboutText')}</p>
      </article>
    </section>
  );
};

export default About;
