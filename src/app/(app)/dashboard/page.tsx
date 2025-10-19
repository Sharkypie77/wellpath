import {
  Activity,
  ArrowUpRight,
  CalendarClock,
  HeartPulse,
  Ruler,
  Scale,
  Thermometer,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockAppointments, mockHealthMetrics, mockUser, placeholderImages } from "@/lib/data";
import HealthMetricCard from "@/components/health-metric-card";
import { HealthCharts } from "@/components/health-charts";

export default function Dashboard() {
  const upcomingAppointments = mockAppointments.filter(
    (a) => a.status === "Scheduled"
  );
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <HealthMetricCard
            title="Blood Pressure"
            value={`${mockHealthMetrics[0].value.systolic}/${mockHealthMetrics[0].value.diastolic}`}
            unit={mockHealthMetrics[0].unit}
            icon={<HeartPulse />}
          />
          <HealthMetricCard
            title="Glucose"
            value={mockHealthMetrics[1].value.toString()}
            unit={mockHealthMetrics[1].unit}
            icon={<Thermometer />}
          />
          <HealthMetricCard
            title="Weight"
            value={mockHealthMetrics[2].value.toString()}
            unit={mockHealthMetrics[2].unit}
            icon={<Scale />}
          />
          <HealthMetricCard
            title="BMI"
            value={mockHealthMetrics[3].value.toString()}
            unit={mockHealthMetrics[3].unit}
            icon={<Ruler />}
          />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Health Progress</CardTitle>
                <CardDescription>
                  Recent trends in your key health metrics.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <HealthCharts />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                You have {upcomingAppointments.length} upcoming appointments.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8">
              {upcomingAppointments.map((appt) => {
                const providerImage = placeholderImages.find(p => p.id === `provider${appt.providerId.split('-')[1]}`)
                return (
                  <div key={appt.id} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                       <AvatarImage src={providerImage?.imageUrl} alt={appt.providerName} />
                      <AvatarFallback>{appt.providerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {appt.providerName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {appt.providerSpecialty}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-sm text-right">
                      <div>{appt.dateTime.toLocaleDateString()}</div>
                      <div className="text-muted-foreground">{appt.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
            <CardContent>
               <Button asChild size="sm" className="w-full">
                <Link href="/appointments">
                  Book New Appointment
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
