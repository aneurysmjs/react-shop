import type { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';

interface SwitchProps {
  isOn: boolean;
  toggle: () => void;
}

const Switch: FC<SwitchProps> = ({ isOn, toggle }) => (
  <button
    role="switch"
    aria-checked={isOn}
    data-testid="toggle"
    className={`
      relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full
      border-2 border-transparent transition-colors duration-200 ease-in-out

      dark:focus:ring-sky-400

      focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2

      ${
        isOn
          ? `
            bg-cyan-500

            dark:bg-sky-400
          `
          : 'bg-gray-200'
      }
    `}
    onClick={toggle}
  >
    {isOn ? (
      <FontAwesomeIcon className="absolute left-0.5 top-0.5" icon={faMoon} />
    ) : (
      <FontAwesomeIcon className="absolute right-0.5 top-0.5" icon={faSun} />
    )}
    <span className="sr-only">switch</span>
    <span
      aria-hidden="true"
      className={`
        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white
        shadow ring-0 transition duration-200 ease-in-out

        ${isOn ? 'translate-x-6' : 'translate-x-0'}
      `}
    />
  </button>
);

export default Switch;
