
"use client";

import { Suspense, useEffect } from 'react';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider } from '@/components/theme-provider';

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// This component is needed to set the dir and lang attributes on the html tag
function LanguageManager({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, i18n.language]);

  return <>{children}</>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-body antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <I18nextProvider i18n={i18n}>
            <LanguageManager>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <FirebaseClientProvider>
                  {children}
                </FirebaseClientProvider>
                <Toaster />
              </ThemeProvider>
            </LanguageManager>
          </I18nextProvider>
        </Suspense>
      </body>
    </html>
  );
}
