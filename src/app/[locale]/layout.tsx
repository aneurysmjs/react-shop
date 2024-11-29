import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { FC, PropsWithChildren } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import Header from '@/components/core/Header';
import ThemeProvider from '@/providers/ThemeProvider';
import QueryProvider from '@/providers/QueryProvider';

import '@/assets/css/styles.css';

const geistSans = localFont({
  src: '../../assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: '../../assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  description: 'A place to know flatland tricks',
  title: 'Flatland Matrix',
};

interface RootLayoutProps extends PropsWithChildren {
  params: {
    locale: 'en' | 'es' | 'ru';
  };
}

const RootLayout: FC<RootLayoutProps> = async ({ children, params: { locale } }) => {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>
              <Header />
              {children}
            </QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
