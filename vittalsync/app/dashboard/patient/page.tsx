"use client"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  Calendar,
  Clock,
  Heart,
  Thermometer,
  TreesIcon as Lungs,
  AlertTriangle,
  MessageSquare,
  Plus,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Simulated vital data
const generateVitalData = (hours = 24, baseValue: number, variance: number) => {
  return Array.from({ length: hours }).map((_, i) => {
    const time = new Date()
    time.setHours(time.getHours() - (hours - i))

    return {
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      value: Math.max(0, baseValue + (Math.random() - 0.5) * variance),
    }
  })
}

export default function PatientDashboard() {
  const [heartRate, setHeartRate] = useState(generateVitalData(24, 75, 15))
  const [bloodPressure, setBloodPressure] = useState({
    systolic: generateVitalData(24, 120, 10),
    diastolic: generateVitalData(24, 80, 8),
  })
  const [temperature, setTemperature] = useState(generateVitalData(24, 37, 0.8))
  const [oxygenLevel, setOxygenLevel] = useState(generateVitalData(24, 97, 4))

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => {
        const newData = [...prev.slice(1)]
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        newData.push({
          time,
          value: Math.max(60, Math.min(100, prev[prev.length - 1].value + (Math.random() - 0.5) * 5)),
        })
        return newData
      })

      setOxygenLevel((prev) => {
        const newData = [...prev.slice(1)]
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        newData.push({
          time,
          value: Math.max(90, Math.min(100, prev[prev.length - 1].value + (Math.random() - 0.5) * 2)),
        })
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Current values (last in the array)
  const currentHeartRate = heartRate[heartRate.length - 1].value.toFixed(0)
  const currentOxygenLevel = oxygenLevel[oxygenLevel.length - 1].value.toFixed(1)
  const currentTemperature = temperature[temperature.length - 1].value.toFixed(1)
  const currentSystolic = bloodPressure.systolic[bloodPressure.systolic.length - 1].value.toFixed(0)
  const currentDiastolic = bloodPressure.diastolic[bloodPressure.diastolic.length - 1].value.toFixed(0)

  // Upcoming appointments
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Practitioner",
      date: "Mar 28, 2025",
      time: "2:30 PM",
      status: "pending",
    },
  ]

  // Health alerts
  const alerts = [
    {
      id: 1,
      title: "Elevated Heart Rate",
      description: "Your heart rate was above normal for 30 minutes yesterday.",
      time: "Yesterday",
      severity: "medium",
    },
    {
      id: 2,
      title: "Medication Reminder",
      description: "Remember to take your blood pressure medication.",
      time: "Today",
      severity: "low",
    },
  ]

  return (
    <DashboardLayout role="patient">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Patient Dashboard</h1>
        <Button size="sm">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Emergency
        </Button>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <VitalCard
              title="Heart Rate"
              value={`${currentHeartRate} bpm`}
              icon={<Heart className="h-4 w-4 text-rose-500" />}
              description="Normal range: 60-100 bpm"
              status={Number(currentHeartRate) < 60 ? "low" : Number(currentHeartRate) > 100 ? "high" : "normal"}
            />

            <VitalCard
              title="Blood Oxygen"
              value={`${currentOxygenLevel}%`}
              icon={<Lungs className="h-4 w-4 text-blue-500" />}
              description="Normal range: 95-100%"
              status={Number(currentOxygenLevel) < 95 ? "low" : "normal"}
            />

            <VitalCard
              title="Temperature"
              value={`${currentTemperature}°C`}
              icon={<Thermometer className="h-4 w-4 text-orange-500" />}
              description="Normal range: 36.1-37.2°C"
              status={Number(currentTemperature) < 36.1 ? "low" : Number(currentTemperature) > 37.5 ? "high" : "normal"}
            />

            <VitalCard
              title="Blood Pressure"
              value={`${currentSystolic}/${currentDiastolic}`}
              icon={<Activity className="h-4 w-4 text-emerald-500" />}
              description="Normal range: <120/80"
              status={
                Number(currentSystolic) > 140 || Number(currentDiastolic) > 90
                  ? "high"
                  : Number(currentSystolic) < 90 || Number(currentDiastolic) < 60
                    ? "low"
                    : "normal"
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Heart Rate Monitoring</CardTitle>
                <CardDescription>24-hour heart rate trend</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Heart Rate (bpm)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="aspect-[4/3]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={heartRate}>
                      <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={10} />
                      <YAxis tickLine={false} axisLine={false} tickMargin={10} domain={[40, 120]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                        stroke="var(--color-value)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Oxygen Level</CardTitle>
                <CardDescription>24-hour SpO2 trend</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "SpO2 (%)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="aspect-[4/3]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={oxygenLevel}>
                      <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={10} />
                      <YAxis tickLine={false} axisLine={false} tickMargin={10} domain={[85, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                        stroke="var(--color-value)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled appointments</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Book New
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-start justify-between rounded-lg border p-3">
                      <div className="space-y-1">
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{appointment.date}</span>
                          <Clock className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>
                        {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Health Alerts</CardTitle>
                  <CardDescription>Recent notifications about your health</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start justify-between rounded-lg border p-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <AlertBadge severity={alert.severity} />
                          <p className="font-medium">{alert.title}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{alert.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Health Assistant</CardTitle>
              <CardDescription>Ask questions about your health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Input placeholder="Ask a question about your health..." className="flex-1" />
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Vitals</CardTitle>
              <CardDescription>Comprehensive view of your health metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Detailed vitals content would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
              <CardDescription>Manage your upcoming and past appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Appointments management content would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Health Alerts</CardTitle>
              <CardDescription>Important notifications about your health</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Health alerts content would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

function VitalCard({
  title,
  value,
  icon,
  description,
  status = "normal",
}: {
  title: string
  value: string
  icon: React.ReactNode
  description: string
  status: "normal" | "high" | "low"
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="mt-2">
          <StatusBadge status={status} />
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: "normal" | "high" | "low" }) {
  if (status === "normal") {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
        Normal
      </Badge>
    )
  }
  if (status === "high") {
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400">
        High
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
      Low
    </Badge>
  )
}

function AlertBadge({ severity }: { severity: "high" | "medium" | "low" }) {
  if (severity === "high") {
    return <AlertTriangle className="h-4 w-4 text-red-500" />
  }
  if (severity === "medium") {
    return <AlertTriangle className="h-4 w-4 text-amber-500" />
  }
  return <AlertTriangle className="h-4 w-4 text-blue-500" />
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  )
}

