"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

const weightData = [
  { month: "Jan", weight: 78 },
  { month: "Feb", weight: 77 },
  { month: "Mar", weight: 76 },
  { month: "Apr", weight: 76 },
  { month: "May", weight: 75 },
  { month: "Jun", weight: 74 },
]

const bpData = [
  { month: "Jan", systolic: 125, diastolic: 82 },
  { month: "Feb", systolic: 122, diastolic: 80 },
  { month: "Mar", systolic: 120, diastolic: 80 },
  { month: "Apr", systolic: 118, diastolic: 78 },
  { month: "May", systolic: 120, diastolic: 80 },
  { month: "Jun", systolic: 119, diastolic: 79 },
]

const chartConfig = {
  weight: {
    label: "Weight (kg)",
    color: "hsl(var(--chart-1))",
  },
  systolic: {
    label: "Systolic (mmHg)",
    color: "hsl(var(--chart-1))",
  },
  diastolic: {
    label: "Diastolic (mmHg)",
    color: "hsl(var(--chart-2))",
  },
}

export function HealthCharts() {
  return (
    <Tabs defaultValue="bp">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="bp">Blood Pressure</TabsTrigger>
        <TabsTrigger value="weight">Weight</TabsTrigger>
      </TabsList>
      <TabsContent value="bp">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart accessibilityLayer data={bpData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="systolic" stroke="var(--color-systolic)" />
                <Line type="monotone" dataKey="diastolic" stroke="var(--color-diastolic)" />
            </LineChart>
        </ChartContainer>
      </TabsContent>
      <TabsContent value="weight">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={weightData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="weight" fill="var(--color-weight)" radius={4} />
            </BarChart>
        </ChartContainer>
      </TabsContent>
    </Tabs>
  )
}
