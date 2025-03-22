"use client"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Bed, Download, HeartPulse, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AdminDashboard() {
  // Hospital occupancy data
  const occupancyData = [
    { name: "General Ward", value: 78, color: "hsl(var(--chart-1))" },
    { name: "ICU", value: 92, color: "hsl(var(--chart-2))" },
    { name: "Emergency", value: 65, color: "hsl(var(--chart-3))" },
    { name: "Pediatrics", value: 45, color: "hsl(var(--chart-4))" },
    { name: "Maternity", value: 60, color: "hsl(var(--chart-5))" },
  ]

  // Patient admission trends
  const admissionTrends = [
    { month: "Jan", emergency: 120, scheduled: 85 },
    { month: "Feb", emergency: 110, scheduled: 90 },
    { month: "Mar", emergency: 130, scheduled: 95 },
    { month: "Apr", emergency: 140, scheduled: 100 },
    { month: "May", emergency: 125, scheduled: 110 },
    { month: "Jun", emergency: 135, scheduled: 115 },
  ]

  // Resource availability
  const resources = [
    { name: "ICU Beds", total: 50, available: 4, status: "critical" },
    { name: "Ventilators", total: 30, available: 8, status: "warning" },
    { name: "Isolation Rooms", total: 25, available: 12, status: "normal" },
    { name: "Operating Rooms", total: 10, available: 3, status: "warning" },
    { name: "Emergency Beds", total: 40, available: 15, status: "normal" },
  ]

  // Staff on duty
  const staffOnDuty = [
    { department: "Emergency", doctors: 8, nurses: 15 },
    { department: "ICU", doctors: 6, nurses: 12 },
    { department: "General Ward", doctors: 10, nurses: 20 },
    { department: "Pediatrics", doctors: 5, nurses: 10 },
    { department: "Surgery", doctors: 7, nurses: 14 },
  ]

  // Emergency alerts
  const emergencyAlerts = [
    {
      id: 1,
      title: "ICU Bed Shortage",
      description: "Only 4 ICU beds available. Consider emergency resource allocation.",
      time: "10 minutes ago",
      severity: "high",
    },
    {
      id: 2,
      title: "Ventilator Shortage Warning",
      description: "Ventilator availability below 30% threshold.",
      time: "1 hour ago",
      severity: "medium",
    },
  ]

  return (
    <DashboardLayout role="admin">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Hospital Management Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Emergency Management
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Patients"
          value="487"
          change="+12% from last week"
          trend="up"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Bed Occupancy"
          value="76%"
          change="+5% from last week"
          trend="up"
          icon={<Bed className="h-4 w-4" />}
        />
        <MetricCard
          title="ICU Availability"
          value="8%"
          change="-3% from last week"
          trend="down"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <MetricCard
          title="Staff on Duty"
          value="142"
          change="Normal staffing levels"
          trend="stable"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Hospital Occupancy</CardTitle>
                <CardDescription>Current occupancy rates by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={occupancyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {occupancyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Admission Trends</CardTitle>
                <CardDescription>Emergency vs. scheduled admissions</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    emergency: {
                      label: "Emergency",
                      color: "hsl(var(--chart-4))",
                    },
                    scheduled: {
                      label: "Scheduled",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={admissionTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="emergency" fill="var(--color-emergency)" />
                      <Bar dataKey="scheduled" fill="var(--color-scheduled)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resource Availability</CardTitle>
              <CardDescription>Current status of critical hospital resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resources.map((resource) => (
                  <div key={resource.name} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ResourceStatusDot status={resource.status} />
                        <span className="font-medium">{resource.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {resource.available} / {resource.total} available
                        </span>
                        <Badge
                          variant={
                            resource.status === "critical"
                              ? "destructive"
                              : resource.status === "warning"
                                ? "outline"
                                : "default"
                          }
                        >
                          {Math.round((resource.available / resource.total) * 100)}%
                        </Badge>
                      </div>
                    </div>
                    <Progress
                      value={(resource.available / resource.total) * 100}
                      className={
                        resource.status === "critical"
                          ? "bg-red-100 dark:bg-red-950"
                          : resource.status === "warning"
                            ? "bg-amber-100 dark:bg-amber-950"
                            : "bg-muted"
                      }
                      indicatorClassName={
                        resource.status === "critical"
                          ? "bg-red-500"
                          : resource.status === "warning"
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Resource Management</CardTitle>
              <CardDescription>Comprehensive view of hospital resources</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Detailed resource management content would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Management</CardTitle>
              <CardDescription>Current staff allocation by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffOnDuty.map((staff) => (
                  <div key={staff.department} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{staff.department}</h3>
                      <Badge variant="outline">{staff.doctors + staff.nurses} Total Staff</Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Stethoscope className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Doctors</p>
                          <p className="text-lg font-bold">{staff.doctors}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <HeartPulse className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Nurses</p>
                          <p className="text-lg font-bold">{staff.nurses}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Management</CardTitle>
              <CardDescription>Critical alerts and emergency response</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start justify-between rounded-lg border p-4 bg-red-50/50 dark:bg-red-950/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{alert.title}</h3>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

function MetricCard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "stable"
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-full bg-primary/10 p-1">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          {trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
          {trend === "down" && <TrendingDown className="h-3 w-3 text-red-500" />}
          {trend === "stable" && <TrendingStable className="h-3 w-3 text-blue-500" />}
          {change}
        </p>
      </CardContent>
    </Card>
  )
}

function ResourceStatusDot({ status }: { status: string }) {
  if (status === "critical") {
    return <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
  }
  if (status === "warning") {
    return <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
  }
  return <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
}

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

function TrendingDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  )
}

function TrendingStable(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 6H3" />
      <path d="M21 12H3" />
      <path d="M21 18H3" />
    </svg>
  )
}

function Stethoscope(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  )
}

