export const dynamic = 'force-dynamic';

import * as React from 'react';
import AppLayoutClient from './layout.client';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppLayoutClient>{children}</AppLayoutClient>;
}
