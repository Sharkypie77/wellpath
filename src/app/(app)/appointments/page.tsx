import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AppointmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Appointment Booking</h1>
        <p className="text-muted-foreground">
          Schedule and manage your appointments with healthcare providers.
        </p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This feature is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Our appointment booking system will allow you to find providers, view available time slots, and schedule telemedicine or in-person visits seamlessly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
