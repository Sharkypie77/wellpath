"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileForm } from "./profile-form";

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Profile & Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal information, health history, and preferences.
        </p>
      </div>
       <Card>
        <CardContent className="p-6">
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
