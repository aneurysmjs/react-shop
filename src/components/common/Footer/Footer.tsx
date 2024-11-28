import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer
      className={`
        bottom-0 left-0 grid w-full place-items-center border-gray-300 bg-white
      `}
    >
      <section
        className={`
          w-full bg-gray-100 p-5 text-center text-gray-800

          dark:bg-gray-800 dark:text-white
        `}
      >
        <p className="text-center">{t('footer.author')}</p>
      </section>
    </footer>
  );
};

export default Footer;
