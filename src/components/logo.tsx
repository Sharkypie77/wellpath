import { cn } from "@/lib/utils";
import { HeartPulse } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <HeartPulse className="h-6 w-6 text-primary" />
      <span className="font-headline text-xl font-bold">HealthWise Hub</span>
    </div>
  );
}
