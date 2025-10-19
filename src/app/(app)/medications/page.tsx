"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = 'force-dynamic';

export default function MedicationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Medication Reminders</h1>
        <p className="text-muted-foreground">Manage your medications, track dosages, and set reminders.</p>
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
            Soon, you'll be able to add and manage your medications, schedule reminders, and view your medication history right here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
