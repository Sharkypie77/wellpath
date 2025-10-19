
"use client";

import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';

const HealthCharts = dynamic(() => import('@/components/health-charts').then(mod => mod.HealthCharts), {
  ssr: false,
  loading: () => <Skeleton className="h-[250px] w-full" />
});


export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Progress Tracking</h1>
        <p className="text-muted-foreground">
          Monitor your health metrics and track your progress over time.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Health Trends</CardTitle>
          <CardDescription>
            Visualize your blood pressure and weight trends for the last 6 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HealthCharts />
        </CardContent>
      </Card>
    </div>
  );
}
