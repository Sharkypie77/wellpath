"use client"

import { Suspense, useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';

// This component is needed to set the dir and lang attributes on the html tag
function LanguageManager({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = i18n.language;
      document.documentElement.dir = i18n.dir(i18n.language);
    }
  }, [i18n, i18n.language]);

  return <>{children}</>;
}


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Suspense fallback={<div>Loading...</div>}>
          <I18nextProvider i18n={i18n}>
            <LanguageManager>
              {children}
            </LanguageManager>
          </I18nextProvider>
        </Suspense>
    </div>
  )
}
