export const dynamic = 'force-dynamic';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockDashboardMetrics, mockUser, mockHealthTips } from "@/lib/data";
import DashboardMetricCard from "@/components/dashboard-metric-card";
import { Activity, CalendarPlus, Lightbulb, PlusCircle } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const today = new Date();
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-6 md:gap-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="space-y-1">
                 <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
                    Welcome back, {mockUser.name.split(' ')[0]}!
                </h1>
                <p className="text-muted-foreground">
                    {format(today, "EEEE, MMMM dd, yyyy")}
                </p>
            </div>
        </div>

        {/* Health Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mockDashboardMetrics.map((metric) => (
            <DashboardMetricCard key={metric.type} metric={metric} />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Log metrics, book appointments, or get tips.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button asChild>
                <Link href="#">
                  <PlusCircle className="mr-2" /> Log New Metric
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/appointments">
                  <CalendarPlus className="mr-2" /> Schedule Appointment
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/education">
                  <Lightbulb className="mr-2" /> View Health Tips
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Today's Health Tips */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Today's Health Tips</CardTitle>
               <CardDescription>
                A few small things you can do today for a healthier tomorrow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {mockHealthTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <Activity className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {tip}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
