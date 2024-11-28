import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import classNames from 'classnames';

import useTheme from '@/hooks/useTheme';
import Switch from '@/components/common/Switch';
import LangsDropdown from '@/components/common/LangsDropdown';

interface ClassNameProp {
  isActive: boolean;
}

const links = [
  {
    id: 0,
    name: 'navbar.links.home',
    path: '/',
  },
];

const navbarLinkClass = 'text-theme p-2 lg:flex-row focus:outline-none';

const Navbar: FC = () => {
  const { t } = useTranslation();
  const [theme, toggleTheme] = useTheme();
  const [isOpen, setOpen] = useState(false);

  const handleNavLinkClick = () => {
    setOpen(false);
  };

  return (
    <div
      className={`
        bg-theme container mx-auto flex flex-wrap justify-between border-b-2
        border-b-gray-100 px-4 py-2

        dark:border-slate-800

        lg:flex-row lg:border-b-0 lg:border-b-transparent lg:py-4
      `}
    >
      <div
        className={`
          navbar__container relative flex w-full items-center justify-between
          text-theme flex-wrap

          lg:justify-end
        `}
      >
        <NavLink
          to="/"
          onClick={handleNavLinkClick}
          className={`
            hidden text-theme

            lg:absolute lg:left-0 lg:top-3 lg:inline-block
          `}
        >
          React shop
        </NavLink>
        <button
          className={`
            inline-block

            lg:hidden
          `}
          type="button"
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <FontAwesomeIcon className="text-theme" size="2x" icon={faXmark} />
          ) : (
            <FontAwesomeIcon className="text-theme" size="2x" icon={faBars} />
          )}
        </button>
        <div
          className={`
            flex items-center justify-between

            lg:order-2
          `}
        >
          <div>
            <LangsDropdown />
          </div>

          <div
            className={`
              flex items-center justify-evenly p-2

              lg:text-initial
            `}
          >
            <Switch isOn={theme === 'dark'} toggle={toggleTheme} />
          </div>
        </div>
        <div
          className={classNames('hidden basis-full flex mx-1 flex-col lg:flex-row lg:!basis-auto', {
            '!flex': isOpen,
          })}
        >
          <nav
            className={`
              mx-1 flex flex-col

              lg:flex-row
            `}
          >
            {links.map(({ id, name, path }) => (
              <NavLink
                key={id}
                to={path}
                onClick={handleNavLinkClick}
                className={({ isActive }: ClassNameProp) =>
                  isActive
                    ? `
                      ${navbarLinkClass}

                      font-medium text-theme
                    `
                    : navbarLinkClass
                }
              >
                {t(name)}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
