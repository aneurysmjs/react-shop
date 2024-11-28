import { useEffect, useState } from 'react';
import { isNil } from 'ramda';

type Theme = 'dark' | 'light';

const THEME_MAP = {
  dark: 'light',
  light: 'dark',
} as const;

export default function useTheme(): [Theme | undefined, () => void] {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const localTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    if (isNil(localTheme)) {
      setTheme(isDarkMode ? 'dark' : 'light');
    } else {
      setTheme(localTheme as Theme);
    }
  }, [isDarkMode, localTheme]);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.value = theme;
    }
  }, [theme]);

  /**
   * @description Toggles between 'dark' and 'light'
   *
   * @return void
   */
  const toggleTheme = () => {
    setTheme((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const nextTheme = THEME_MAP[prev!];

      localStorage.setItem('theme', nextTheme);

      return nextTheme;
    });
  };

  return [theme, toggleTheme];
}
