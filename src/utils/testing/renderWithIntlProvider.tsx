import type { ReactElement, ReactNode } from 'react';

import { render, type RenderResult } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import enMessages from '@/i18n/locales/en.json';

export default function renderWithIntlProvider(
  ui: ReactElement | ReactNode,
  locale = 'en',
  messages = enMessages,
): RenderResult {
  return {
    ...render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        {ui}
      </NextIntlClientProvider>,
    ),
  };
}
