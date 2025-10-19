"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { mockAppointments } from "@/lib/data"
import { AppointmentCard } from "@/components/appointment-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments);

  const upcomingAppointments = appointments
    .filter(a => new Date(a.dateTime) >= new Date() && a.status === "Scheduled")
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  const pastAppointments = appointments
    .filter(a => new Date(a.dateTime) < new Date())
    .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Appointments</h1>
          <p className="text-muted-foreground">
            Schedule and manage your appointments with healthcare providers.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2" /> Book New Appointment
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map(appt => <AppointmentCard key={appt.id} appointment={appt} />)
                ) : (
                    <div className="text-center py-12 text-muted-foreground col-span-full">
                        <p>No upcoming appointments.</p>
                    </div>
                )}
            </div>
        </TabsContent>
        <TabsContent value="past">
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                {pastAppointments.length > 0 ? (
                    pastAppointments.map(appt => <AppointmentCard key={appt.id} appointment={appt} />)
                ) : (
                    <div className="text-center py-12 text-muted-foreground col-span-full">
                        <p>No past appointments found.</p>
                    </div>
                )}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
