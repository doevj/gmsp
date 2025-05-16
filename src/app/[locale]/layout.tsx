import { NextIntlClientProvider } from 'next-intl';
import { PropsWithChildren } from 'react';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header, Footer, Social } from '@/common/layouts';
import '../globals.css';

import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata = {
  title: "Grama Spanish",
  description: "Grama Spanish Language School",
};

export default async function LocaleLayout({
  children,
  params
}: PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en' | 'es' | 'ru')) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={nunito.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className='mb-16' />
          <div className='min-h-[100vh]'>
            {children}
          </div>
          <Social />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}