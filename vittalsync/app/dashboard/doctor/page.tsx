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
  Search,
  UserCheck,
  BellRing,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input as InputUI } from "@/components/ui/input"

export default function DoctorDashboard() {
  // Sample data for patients
  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      condition: "Hypertension",
      status: "stable",
      lastChecked: "2 hours ago",
      heartRate: 78,
      oxygenLevel: 98,
      temperature: 36.8,
      bloodPressure: "125/82",
    },
    {
      id: 2,
      name: "Emily Smith",
      age: 67,
      condition: "Diabetes Type 2",
      status: "needs-attention",
      lastChecked: "30 minutes ago",
      heartRate: 92,
      oxygenLevel: 94,
      temperature: 37.3,
      bloodPressure: "145/95",
    },
    {
      id: 3,
      name: "Michael Johnson",
      age: 52,
      condition: "Post-Surgery Recovery",
      status: "critical",
      lastChecked: "5 minutes ago",
      heartRate: 115,
      oxygenLevel: 91,
      temperature: 38.2,
      bloodPressure: "160/100",
    },
    {
      id: 4,
      name: "Sarah Williams",
      age: 34,
      condition: "Asthma",
      status: "stable",
      lastChecked: "1 hour ago",
      heartRate: 75,
      oxygenLevel: 97,
      temperature: 36.6,
      bloodPressure: "118/75",
    },
  ]

  // Appointments for today
  const appointments = [
    {
      id: 1,
      patient: "John Doe",
      time: "10:00 AM",
      type: "Follow-up",
      status: "completed",
    },
    {
      id: 2,
      patient: "Emily Smith",
      time: "11:30 AM",
      type: "Consultation",
      status: "completed",
    },
    {
      id: 3,
      patient: "Michael Johnson",
      time: "2:00 PM",
      type: "Emergency",
      status: "in-progress",
    },
    {
      id: 4,
      patient: "Sarah Williams",
      time: "3:30 PM",
      type: "Check-up",
      status: "upcoming",
    },
    {
      id: 5,
      patient: "Robert Brown",
      time: "4:45 PM",
      type: "Follow-up",
      status: "upcoming",
    },
  ]

  // Alerts
  const alerts = [
    {
      id: 1,
      patient: "Michael Johnson",
      alert: "Critical Heart Rate",
      time: "5 minutes ago",
      severity: "high",
    },
    {
      id: 2,
      patient: "Emily Smith",
      alert: "Elevated Blood Pressure",
      time: "30 minutes ago",
      severity: "medium",
    },
  ]

  return (
    <DashboardLayout role="doctor">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Doctor Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <BellRing className="mr-2 h-4 w-4" />
            Alerts
            <Badge className="ml-2 rounded-full">{alerts.length}</Badge>
          </Button>
          <Button size="sm">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Emergency Response
          </Button>
        </div>
      </div>

      <Tabs defaultValue="patients" className="mt-6">
        <TabsList>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Patient Overview</CardTitle>
                  <CardDescription>Monitor your assigned patients</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <InputUI
                      type="search"
                      placeholder="Search patients..."
                      className="w-64 rounded-lg bg-background pl-8"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={patient.name} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{patient.name}</h3>
                            <PatientStatusBadge status={patient.status} />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {patient.age} years • {patient.condition}
                          </p>
                          <p className="text-xs text-muted-foreground">Last checked: {patient.lastChecked}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <UserCheck className="mr-2 h-4 w-4" />
                          Check
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                      <VitalIndicator
                        icon={<Heart className="h-4 w-4 text-rose-500" />}
                        label="Heart Rate"
                        value={`${patient.heartRate} bpm`}
                        status={patient.heartRate > 100 ? "high" : patient.heartRate < 60 ? "low" : "normal"}
                      />
                      <VitalIndicator
                        icon={<Lungs className="h-4 w-4 text-blue-500" />}
                        label="Oxygen Level"
                        value={`${patient.oxygenLevel}%`}
                        status={patient.oxygenLevel < 95 ? "low" : "normal"}
                      />
                      <VitalIndicator
                        icon={<Thermometer className="h-4 w-4 text-orange-500" />}
                        label="Temperature"
                        value={`${patient.temperature}°C`}
                        status={patient.temperature > 37.5 ? "high" : patient.temperature < 36.1 ? "low" : "normal"}
                      />
                      <VitalIndicator
                        icon={<Activity className="h-4 w-4 text-emerald-500" />}
                        label="Blood Pressure"
                        value={patient.bloodPressure}
                        status={
                          patient.bloodPressure.split("/")[0] > 140 || patient.bloodPressure.split("/")[1] > 90
                            ? "high"
                            : patient.bloodPressure.split("/")[0] < 90 || patient.bloodPressure.split("/")[1] < 60
                              ? "low"
                              : "normal"
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Patient Monitoring</CardTitle>
              <CardDescription>Monitor vital signs of critical patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients
                  .filter((p) => p.status === "critical" || p.status === "needs-attention")
                  .map((patient) => (
                    <div key={patient.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={patient.name} />
                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{patient.name}</h3>
                            <p className="text-sm text-muted-foreground">{patient.condition}</p>
                          </div>
                        </div>
                        <PatientStatusBadge status={patient.status} />
                      </div>

                      <div className="mt-4 space-y-3">
                        <VitalProgress
                          label="Heart Rate"
                          value={patient.heartRate}
                          min={40}
                          max={140}
                          unit="bpm"
                          status={patient.heartRate > 100 ? "high" : patient.heartRate < 60 ? "low" : "normal"}
                        />
                        <VitalProgress
                          label="Oxygen Level"
                          value={patient.oxygenLevel}
                          min={85}
                          max={100}
                          unit="%"
                          status={patient.oxygenLevel < 95 ? "low" : "normal"}
                        />
                        <VitalProgress
                          label="Temperature"
                          value={patient.temperature}
                          min={35}
                          max={40}
                          unit="°C"
                          status={patient.temperature > 37.5 ? "high" : patient.temperature < 36.1 ? "low" : "normal"}
                        />
                      </div>

                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Intervene</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Appointments</CardTitle>
                  <CardDescription>Your schedule for today</CardDescription>
                </div>
                <Button size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">{appointment.time}</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">{appointment.type}</p>
                        </div>
                      </div>
                    </div>
                    <AppointmentStatusBadge status={appointment.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Critical Alerts</CardTitle>
              <CardDescription>Patients requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start justify-between rounded-lg border p-4 bg-red-50/50 dark:bg-red-950/20"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{alert.patient}</h3>
                          <p className="text-sm font-medium text-red-600 dark:text-red-400">{alert.alert}</p>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Dismiss
                        </Button>
                        <Button size="sm">Respond</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                    <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No Critical Alerts</h3>
                  <p className="text-sm text-muted-foreground">All patients are currently stable</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

function PatientStatusBadge({ status }: { status: string }) {
  if (status === "stable") {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
        Stable
      </Badge>
    )
  }
  if (status === "needs-attention") {
    return (
      <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
        Needs Attention
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400">
      Critical
    </Badge>
  )
}

function AppointmentStatusBadge({ status }: { status: string }) {
  if (status === "completed") {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
        Completed
      </Badge>
    )
  }
  if (status === "in-progress") {
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
        In Progress
      </Badge>
    )
  }
  return <Badge variant="outline">Upcoming</Badge>
}

function VitalIndicator({
  icon,
  label,
  value,
  status = "normal",
}: {
  icon: React.ReactNode
  label: string
  value: string
  status: "normal" | "high" | "low"
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full bg-background p-1.5 shadow-sm">{icon}</div>
      <div>
        <p className="text-xs font-medium">{label}</p>
        <div className="flex items-center gap-1">
          <p className="text-sm font-semibold">{value}</p>
          <StatusDot status={status} />
        </div>
      </div>
    </div>
  )
}

function StatusDot({ status }: { status: "normal" | "high" | "low" }) {
  if (status === "normal") {
    return <div className="h-2 w-2 rounded-full bg-green-500" />
  }
  if (status === "high") {
    return <div className="h-2 w-2 rounded-full bg-red-500" />
  }
  return <div className="h-2 w-2 rounded-full bg-blue-500" />
}

function VitalProgress({
  label,
  value,
  min,
  max,
  unit,
  status = "normal",
}: {
  label: string
  value: number
  min: number
  max: number
  unit: string
  status: "normal" | "high" | "low"
}) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{label}</p>
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold">
            {value}
            {unit}
          </p>
          <StatusDot status={status} />
        </div>
      </div>
      <Progress
        value={percentage}
        className={
          status === "normal"
            ? "bg-muted"
            : status === "high"
              ? "bg-red-100 dark:bg-red-950"
              : "bg-blue-100 dark:bg-blue-950"
        }
        indicatorClassName={status === "normal" ? "bg-green-500" : status === "high" ? "bg-red-500" : "bg-blue-500"}
      />
    </div>
  )
}

