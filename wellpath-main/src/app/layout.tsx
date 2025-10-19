export const dynamic = 'force-dynamic';

import RootLayoutClient from './layout.client';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
