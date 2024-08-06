import { type Metadata } from 'next';
import { RootLayout } from '@/components/RootLayout';
import '@/styles/tailwind.css';
import { NextUIProvider } from '@nextui-org/react';

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export const metadata: Metadata = {
  title: {
    template: '%s - Exchange.map',
    default:
      'Exchange.map - The best aggregator for exchanges (cash, crypto, OTC)',
  },
};

// export async function LocaleLayout() {
//   return [{ lang: 'en' }, { lang: 'ua'} , {lang: 'ru'}]
// }

export default async function LocaleLayout({
 children,
 params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full bg-neutral-950 text-base antialiased">
    <body className="flex min-h-full flex-col">
    {/*<NextIntlClientProvider messages={messages}>*/}
    {/*  <NextUIProvider>*/}
        <RootLayout>{children}</RootLayout>
      {/*</NextUIProvider>*/}
    {/*</NextIntlClientProvider>*/}
    </body>
    </html>
  );
}

// export default function Layout({
//                                  children,
//                                  params,
//                                }: {
//   children: React.ReactNode;
//   params: { locale: string };
// }) {
//   const { locale } = params;
//   console.log('Layout', locale);
//
//   return (
//     <html lang={locale} className="h-full bg-neutral-950 text-base antialiased">
//     <body className="flex min-h-full flex-col">
//     <NextUIProvider>
//       <RootLayout>{children}</RootLayout>
//     </NextUIProvider>
//     </body>
//     </html>
//   );
// }
