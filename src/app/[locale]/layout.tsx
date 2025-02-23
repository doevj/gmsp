import { NextIntlClientProvider } from 'next-intl';
import { PropsWithChildren } from 'react';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header, Footer, Social } from "@/common/layouts";
import '../globals.css';
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
    <html lang={locale}>
      <body >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className='min-h-[70vh]'>
            {children}
          </div>
          <Social />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}