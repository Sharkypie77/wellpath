
"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-dynamic';

const AuthTabs = dynamic(() => import('@/components/auth-tabs').then(mod => mod.AuthTabs), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[600px]" />,
});

const AuthVisual = dynamic(() => import('@/components/auth-visual').then(mod => mod.AuthVisual), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
});


export default function LoginPage() {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[700px] bg-card shadow-2xl rounded-2xl overflow-hidden">
      <div className="p-8 md:p-12 flex flex-col justify-center">
        <AuthTabs />
      </div>
      <div className="hidden md:block">
        <AuthVisual />
      </div>
    </div>
  );
}
