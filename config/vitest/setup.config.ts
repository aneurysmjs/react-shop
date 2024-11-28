import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

vi.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation() {
    return {
      t: (str: string) => str,
      i18n: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

vi.mock('i18next', () => ({
  default: {
    language: 'en',
    changeLanguage() {
      return Promise.resolve();
    },
  },
}));

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
