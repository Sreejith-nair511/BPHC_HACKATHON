"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  AlertTriangle,
  Battery,
  Bluetooth,
  Heart,
  Smartphone,
  Thermometer,
  TreesIcon as Lungs,
  Zap,
  Plus,
} from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Simulated wearable data
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

export default function WearablePage() {
  const [isConnected, setIsConnected] = useState(true)
  const [batteryLevel, setBatteryLevel] = useState(78)
  const [syncStatus, setSyncStatus] = useState("Last synced: 2 minutes ago")

  const [heartRate, setHeartRate] = useState(generateVitalData(24, 75, 15))
  const [oxygenLevel, setOxygenLevel] = useState(generateVitalData(24, 97, 4))
  const [temperature, setTemperature] = useState(generateVitalData(24, 37, 0.8))
  const [steps, setSteps] = useState(7842)
  const [calories, setCalories] = useState(356)

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

      setTemperature((prev) => {
        const newData = [...prev.slice(1)]
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        newData.push({
          time,
          value: Math.max(36, Math.min(38, prev[prev.length - 1].value + (Math.random() - 0.5) * 0.2)),
        })
        return newData
      })

      setSteps((prev) => prev + Math.floor(Math.random() * 20))
      setCalories((prev) => prev + Math.floor(Math.random() * 5))
      setBatteryLevel((prev) => Math.max(0, Math.min(100, prev - 0.1)))
      setSyncStatus("Last synced: Just now")
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Current values (last in the array)
  const currentHeartRate = heartRate[heartRate.length - 1].value.toFixed(0)
  const currentOxygenLevel = oxygenLevel[oxygenLevel.length - 1].value.toFixed(1)
  const currentTemperature = temperature[temperature.length - 1].value.toFixed(1)

  return (
    <DashboardLayout role="patient">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Kadambini Wearable Device</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Bluetooth className="h-4 w-4" />
            {isConnected ? "Connected" : "Connect"}
          </Button>
          <Button size="sm">
            <Zap className="mr-2 h-4 w-4" />
            Sync Now
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Device Status</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Connection</span>
                <div className="flex items-center gap-1">
                  {isConnected ? (
                    <>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Connected</span>
                    </>
                  ) : (
                    <>
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span className="text-sm font-medium">Disconnected</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Battery</span>
                <div className="flex items-center gap-1">
                  <Battery className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{batteryLevel}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sync Status</span>
                <span className="text-sm font-medium">{syncStatus}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Model</span>
                <span className="text-sm font-medium">Kadambini K1 Pro</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentHeartRate} bpm</div>
            <p className="text-xs text-muted-foreground">Normal range: 60-100 bpm</p>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={heartRate.slice(-12)}>
                  <Line type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Oxygen Level</CardTitle>
            <Lungs className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentOxygenLevel}%</div>
            <p className="text-xs text-muted-foreground">Normal range: 95-100%</p>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={oxygenLevel.slice(-12)}>
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentTemperature}°C</div>
            <p className="text-xs text-muted-foreground">Normal range: 36.1-37.2°C</p>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={temperature.slice(-12)}>
                  <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vitals" className="mt-6">
        <TabsList>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="activity">Activity Tracking</TabsTrigger>
          <TabsTrigger value="settings">Device Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="vitals" className="space-y-4">
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
                      color: "hsl(var(--chart-4))",
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

          <Card>
            <CardHeader>
              <CardTitle>Temperature Monitoring</CardTitle>
              <CardDescription>24-hour body temperature trend</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Temperature (°C)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="aspect-[5/1]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperature}>
                    <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={10} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={10} domain={[35.5, 38.5]} />
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
              <CardTitle>Emergency Alerts</CardTitle>
              <CardDescription>Configure alerts for critical health conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-rose-500" />
                    <div>
                      <p className="font-medium">Heart Rate Alert</p>
                      <p className="text-sm text-muted-foreground">Alert when heart rate is outside 50-120 bpm</p>
                    </div>
                  </div>
                  <Badge>Enabled</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lungs className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Low Oxygen Alert</p>
                      <p className="text-sm text-muted-foreground">Alert when SpO2 falls below 92%</p>
                    </div>
                  </div>
                  <Badge>Enabled</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Fever Alert</p>
                      <p className="text-sm text-muted-foreground">Alert when temperature exceeds 38°C</p>
                    </div>
                  </div>
                  <Badge>Enabled</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="font-medium">Fall Detection</p>
                      <p className="text-sm text-muted-foreground">Alert when a fall is detected</p>
                    </div>
                  </div>
                  <Badge>Enabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Steps Today</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{steps.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Goal: 10,000 steps</p>
                <Progress className="mt-2" value={(steps / 10000) * 100} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calories}</div>
                <p className="text-xs text-muted-foreground">Goal: 500 calories</p>
                <Progress className="mt-2" value={(calories / 500) * 100} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Distance</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2 km</div>
                <p className="text-xs text-muted-foreground">Goal: 5 km</p>
                <Progress className="mt-2" value={(3.2 / 5) * 100} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Minutes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42 min</div>
                <p className="text-xs text-muted-foreground">Goal: 60 min</p>
                <Progress className="mt-2" value={(42 / 60) * 100} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity Summary</CardTitle>
              <CardDescription>Your activity trends for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { day: "Mon", steps: 5234, calories: 245 },
                      { day: "Tue", steps: 6782, calories: 312 },
                      { day: "Wed", steps: 4890, calories: 198 },
                      { day: "Thu", steps: 8123, calories: 387 },
                      { day: "Fri", steps: 7456, calories: 342 },
                      { day: "Sat", steps: 9234, calories: 421 },
                      { day: "Sun", steps: 7842, calories: 356 },
                    ]}
                  >
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="steps" fill="#8884d8" name="Steps" />
                    <Bar yAxisId="right" dataKey="calories" fill="#82ca9d" name="Calories" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Device Settings</CardTitle>
              <CardDescription>Configure your Kadambini wearable device</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Continuous Heart Rate Monitoring</p>
                    <p className="text-sm text-muted-foreground">Monitor heart rate continuously throughout the day</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Fall Detection</p>
                    <p className="text-sm text-muted-foreground">Automatically detect falls and send alerts</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto Sync</p>
                    <p className="text-sm text-muted-foreground">Automatically sync data every 15 minutes</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Emergency Contact Alerts</p>
                    <p className="text-sm text-muted-foreground">Send alerts to emergency contacts</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Battery Saver Mode</p>
                    <p className="text-sm text-muted-foreground">Reduce monitoring frequency to save battery</p>
                  </div>
                  <Switch checked={false} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>People to notify in case of emergency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Rahul Sharma</p>
                      <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  <Badge>Primary</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>AP</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Anita Patel</p>
                      <p className="text-sm text-muted-foreground">+91 87654 32109</p>
                    </div>
                  </div>
                  <Badge variant="outline">Secondary</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Priya Patel</p>
                      <p className="text-sm text-muted-foreground">+91 76543 21098</p>
                    </div>
                  </div>
                  <Badge variant="outline">Doctor</Badge>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Emergency Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

// Missing component definitions
function Switch({ checked }: { checked: boolean }) {
  return (
    <div className={`relative inline-flex h-6 w-11 items-center rounded-full ${checked ? "bg-primary" : "bg-muted"}`}>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </div>
  )
}

function MapPin(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

