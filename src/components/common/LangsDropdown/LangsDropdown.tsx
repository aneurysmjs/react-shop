import { FC, MouseEvent, useState, useRef, useCallback } from 'react';

import useClickOutside from '@/hooks/useClickOutside';
import useLanguage from '@/hooks/useLanguage';

const LANGS = ['ru', 'en', 'es'] as const;

const LangsDropdown: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  /**
   * @description Close handler when cliking outside.?
   */
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useClickOutside(ref, handleClose);

  const [language, setLanguage] = useLanguage(handleClose);

  /**
   * @description Toggles langs dropdown
   */
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  /**
   *
   * @param evt mouse
   */
  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const target = evt.target as HTMLButtonElement;
    const { lang } = target.dataset;

    if (lang) {
      setLanguage(lang);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className={`
          p-2 font-light uppercase text-gray-800

          dark:text-white
        `}
        data-testid="dropdown-toggle"
        onClick={handleToggle}
      >
        {language}
      </button>

      {isOpen ? (
        <div
          className={`
            absolute top-9 flex flex-col rounded bg-gray-100

            dark:text-slate-400
          `}
          data-testid="dropdown-menu"
        >
          {LANGS.filter((lang) => lang !== language).map((lang) => (
            <button
              key={lang}
              onClick={handleClick}
              className={`
                rounded p-2 text-center uppercase

                dark:text-gray-900

                hover:bg-gray-200
              `}
              data-lang={lang}
              data-testid="dropdown-item"
            >
              {lang}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default LangsDropdown;
