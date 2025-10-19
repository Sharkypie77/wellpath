import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Profile & Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal information, health history, and preferences.
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
            Here you will be able to edit your personal details, update your medical history, manage privacy settings, and set your notification preferences.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
