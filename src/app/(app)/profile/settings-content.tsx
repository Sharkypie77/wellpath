"use client"

import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SettingsContent() {
  const { theme, setTheme } = useTheme()

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your application preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <p className="text-xs text-muted-foreground">
              Enable or disable the dark theme.
            </p>
          </div>
          <Switch
            id="dark-mode"
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
         <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="reminders">Medication Reminders</Label>
             <p className="text-xs text-muted-foreground">
              Receive push notifications for your medications.
            </p>
          </div>
          <Switch id="reminders" defaultChecked />
        </div>
         <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="health-tips">Health Tips</Label>
             <p className="text-xs text-muted-foreground">
              Get daily tips for a healthier lifestyle.
            </p>
          </div>
          <Switch id="health-tips" defaultChecked/>
        </div>
      </CardContent>
    </Card>
  )
}
