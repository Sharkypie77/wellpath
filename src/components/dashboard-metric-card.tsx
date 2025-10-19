
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Droplets,
  HeartPulse,
  Weight,
  Waves
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardMetric, HealthMetricType } from "@/lib/types";

const metricIcons: Record<HealthMetricType, React.ReactNode> = {
  "Blood Pressure": <HeartPulse />,
  "Glucose": <Droplets />,
  "Weight": <Weight />,
  "BMI": <Weight />,
  "Heart Rate": <Waves />,
};

const statusColors = {
  Normal: "text-green-500",
  Warning: "text-yellow-500",
  Alert: "text-red-500",
};

const trendIcons = {
  up: <ArrowUp className="w-4 h-4" />,
  down: <ArrowDown className="w-4 h-4" />,
  stable: <ArrowRight className="w-4 h-4" />,
};

const DashboardMetricCard = React.memo(function DashboardMetricCard({ metric }: { metric: DashboardMetric }) {
  const { type, value, unit, status, trend } = metric;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{type}</CardTitle>
        <div className="text-muted-foreground">{metricIcons[type]}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{unit}</p>
        <div className="flex items-center text-xs mt-2">
          <span className={cn("font-semibold", statusColors[status])}>
            {status}
          </span>
          <div className="flex items-center text-muted-foreground ml-2">
            {trendIcons[trend]}
            <span className="ml-1">{trend}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default DashboardMetricCard;
