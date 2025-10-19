import Image from "next/image";
import { format } from "date-fns";
import { Appointment } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentCardProps {
  appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const {
    providerName,
    providerSpecialty,
    providerImage,
    dateTime,
    type,
    status,
    reason,
  } = appointment;
  const isPast = new Date(dateTime) < new Date();

  const statusColors: { [key: string]: string } = {
    Scheduled: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <Card className={cn("overflow-hidden", isPast && "opacity-60")}>
      <CardHeader className="flex flex-row items-start gap-4 bg-muted/50 p-4">
        <Avatar className="h-16 w-16 border">
          <AvatarImage src={providerImage} alt={providerName} />
          <AvatarFallback>{providerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <CardTitle className="text-lg font-headline">{providerName}</CardTitle>
          <p className="text-sm text-muted-foreground">{providerSpecialty}</p>
          <Badge className={cn("text-xs", statusColors[status])} variant="secondary">
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4 text-sm">
         <div className="space-y-2">
            <p className="font-semibold">{reason}</p>
            <div className="flex items-center text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>{format(new Date(dateTime), "MMMM dd, yyyy 'at' h:mm a")}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
                {type === 'Telemedicine' ? <Video className="mr-2 h-4 w-4" /> : <MapPin className="mr-2 h-4 w-4" />}
                <span>{type}</span>
            </div>
        </div>
        {!isPast && (
          <div className="flex gap-2 pt-2 border-t">
            <Button variant="outline" size="sm">Reschedule</Button>
            <Button variant="outline" size="sm" >Cancel</Button>
            {type === 'Telemedicine' && <Button size="sm" className="ml-auto">Join Call</Button>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
