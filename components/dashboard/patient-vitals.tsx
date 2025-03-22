"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { generateIndianPatients } from "@/data/india-health-data"

// Sample data for patient vitals
const heartRateData = [
  { time: "00:00", value: 72 },
  { time: "01:00", value: 70 },
  { time: "02:00", value: 68 },
  { time: "03:00", value: 67 },
  { time: "04:00", value: 66 },
  { time: "05:00", value: 68 },
  { time: "06:00", value: 70 },
  { time: "07:00", value: 74 },
  { time: "08:00", value: 78 },
  { time: "09:00", value: 80 },
  { time: "10:00", value: 82 },
  { time: "11:00", value: 84 },
  { time: "12:00", value: 82 },
]

const bloodPressureData = [
  { time: "00:00", systolic: 120, diastolic: 80 },
  { time: "01:00", systolic: 118, diastolic: 78 },
  { time: "02:00", systolic: 116, diastolic: 76 },
  { time: "03:00", systolic: 115, diastolic: 75 },
  { time: "04:00", systolic: 114, diastolic: 74 },
  { time: "05:00", systolic: 116, diastolic: 76 },
  { time: "06:00", systolic: 118, diastolic: 78 },
  { time: "07:00", systolic: 122, diastolic: 82 },
  { time: "08:00", systolic: 126, diastolic: 84 },
  { time: "09:00", systolic: 128, diastolic: 86 },
  { time: "10:00", systolic: 130, diastolic: 88 },
  { time: "11:00", systolic: 132, diastolic: 90 },
  { time: "12:00", systolic: 130, diastolic: 88 },
]

const oxygenData = [
  { time: "00:00", value: 98 },
  { time: "01:00", value: 98 },
  { time: "02:00", value: 97 },
  { time: "03:00", value: 97 },
  { time: "04:00", value: 96 },
  { time: "05:00", value: 97 },
  { time: "06:00", value: 97 },
  { time: "07:00", value: 98 },
  { time: "08:00", value: 98 },
  { time: "09:00", value: 99 },
  { time: "10:00", value: 99 },
  { time: "11:00", value: 98 },
  { time: "12:00", value: 98 },
]

// Generate Indian patients
const activePatients = generateIndianPatients(4)

export function PatientVitals() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 md:col-span-2 lg:col-span-1 glass-card border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-base">Active Patients</CardTitle>
            <CardDescription>Real-time monitoring</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activePatients.map((patient, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={patient.name} />
                  <AvatarFallback>
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.condition}</p>
                </div>
                <Badge
                  variant={
                    patient.status === "Critical" ? "destructive" : patient.status === "Warning" ? "default" : "outline"
                  }
                  className={
                    patient.status === "Critical"
                      ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 border-none"
                      : patient.status === "Warning"
                        ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-none"
                        : "bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none"
                  }
                >
                  {patient.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-1 glass-card border-none">
        <CardHeader>
          <CardTitle className="text-base">Heart Rate</CardTitle>
          <CardDescription>Beats per minute (BPM)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Heart Rate",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData}>
                <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  domain={[60, 90]}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-value)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, className: "animate-pulse" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="col-span-1 glass-card border-none">
        <CardHeader>
          <CardTitle className="text-base">Blood Oxygen</CardTitle>
          <CardDescription>SpO2 (%)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Oxygen",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={oxygenData}>
                <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  domain={[94, 100]}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-value)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, className: "animate-pulse" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

