'use client';

import { type FC, useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

interface ThemeSwitchProps {
  className?: string;
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { setTheme, theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const isDark = theme === 'dark';

  const handleClick = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  /**
   * Warning: Prop `d` did not match. Server: "..."
   *
   * @see https://stackoverflow.com/a/56525858/5378393
   */
  return isLoaded ? (
    <button role="switch" aria-checked={isDark} onClick={handleClick} className={className}>
      {isDark ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
      <span className="sr-only">switch</span>
    </button>
  ) : null;
};

export default ThemeSwitch;
