import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { FC, PropsWithChildren } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing, type Locale } from '@/i18n/routing';
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
  description: 'Cool ecommerce in Nextjs',
  title: 'React Shop',
};

interface RootLayoutProps extends PropsWithChildren {
  params: {
    locale: Locale;
  };
}

const RootLayout: FC<RootLayoutProps> = async ({ children, params: { locale } }) => {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

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
