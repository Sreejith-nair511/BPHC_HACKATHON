"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { generateIndianPatients } from "@/data/india-health-data"
import { useTranslation } from "@/components/language-selector"
import { cn } from "@/lib/utils"
import { Activity, AlertTriangle, Heart, Thermometer, Droplets, TreesIcon as Lungs } from "lucide-react"

// Generate sample patients
const patients = generateIndianPatients(6)

// Sample vitals data
const heartRateData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: Math.floor(Math.random() * 20) + 65, // Random heart rate between 65-85
}))

const bloodPressureData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  systolic: Math.floor(Math.random() * 30) + 110, // Random systolic between 110-140
  diastolic: Math.floor(Math.random() * 20) + 70, // Random diastolic between 70-90
}))

const oxygenData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: Math.floor(Math.random() * 5) + 94, // Random SpO2 between 94-99
}))

const temperatureData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: (Math.random() * 1.5 + 36.2).toFixed(1), // Random temperature between 36.2-37.7
}))

const respirationData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: Math.floor(Math.random() * 8) + 12, // Random respiration rate between 12-20
}))

export function PatientMonitoring() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0])
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("patient_monitoring")}</h1>
          <p className="text-muted-foreground">
            Real-time monitoring of vital signs and health metrics for your patients.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-none">
            <AlertTriangle className="h-3 w-3 mr-1" />3 Critical Alerts
          </Badge>
          <Button variant="outline" className="glass-button border-none">
            <Activity className="h-4 w-4 mr-2" />
            View All Patients
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 glass-card border-none">
          <CardHeader>
            <CardTitle>Monitored Patients</CardTitle>
            <CardDescription>Select a patient to view detailed vitals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patients.map((patient, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all",
                    selectedPatient.id === patient.id ? "glass" : "hover:bg-white/5",
                  )}
                  onClick={() => setSelectedPatient(patient)}
                >
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
                    <p className="text-xs text-muted-foreground">{patient.condition}</p>
                  </div>
                  <Badge
                    variant={
                      patient.status === "Critical"
                        ? "destructive"
                        : patient.status === "Warning"
                          ? "default"
                          : "outline"
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

        <Card className="md:col-span-2 glass-card border-none">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedPatient.name}</CardTitle>
                <CardDescription>
                  {selectedPatient.age} years • {selectedPatient.gender} • {selectedPatient.condition}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="glass-button border-none">
                View Medical History
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="heart-rate" className="space-y-4">
              <TabsList className="glass border-none">
                <TabsTrigger value="heart-rate" className="flex items-center gap-1">
                  <Heart className="h-4 w-4" /> Heart Rate
                </TabsTrigger>
                <TabsTrigger value="blood-pressure" className="flex items-center gap-1">
                  <Activity className="h-4 w-4" /> Blood Pressure
                </TabsTrigger>
                <TabsTrigger value="oxygen" className="flex items-center gap-1">
                  <Droplets className="h-4 w-4" /> Oxygen
                </TabsTrigger>
                <TabsTrigger value="temperature" className="flex items-center gap-1">
                  <Thermometer className="h-4 w-4" /> Temperature
                </TabsTrigger>
                <TabsTrigger value="respiration" className="flex items-center gap-1">
                  <Lungs className="h-4 w-4" /> Respiration
                </TabsTrigger>
              </TabsList>

              <TabsContent value="heart-rate" className="space-y-4">
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      value: {
                        label: "Heart Rate",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={heartRateData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}`}
                          domain={[60, 100]}
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
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Current</div>
                      <div className="text-2xl font-bold">{heartRateData[heartRateData.length - 1].value} BPM</div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Average</div>
                      <div className="text-2xl font-bold">
                        {Math.round(heartRateData.reduce((acc, item) => acc + item.value, 0) / heartRateData.length)}{" "}
                        BPM
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Status</div>
                      <div className="text-lg font-bold text-green-500">Normal</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="blood-pressure" className="space-y-4">
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      systolic: {
                        label: "Systolic",
                        color: "hsl(var(--chart-1))",
                      },
                      diastolic: {
                        label: "Diastolic",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={bloodPressureData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}`}
                          domain={[60, 150]}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="systolic"
                          stroke="var(--color-systolic)"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6, className: "animate-pulse" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="diastolic"
                          stroke="var(--color-diastolic)"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6, className: "animate-pulse" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Current</div>
                      <div className="text-2xl font-bold">
                        {bloodPressureData[bloodPressureData.length - 1].systolic}/
                        {bloodPressureData[bloodPressureData.length - 1].diastolic} mmHg
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Average</div>
                      <div className="text-2xl font-bold">
                        {Math.round(
                          bloodPressureData.reduce((acc, item) => acc + item.systolic, 0) / bloodPressureData.length,
                        )}
                        /
                        {Math.round(
                          bloodPressureData.reduce((acc, item) => acc + item.diastolic, 0) / bloodPressureData.length,
                        )}{" "}
                        mmHg
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Status</div>
                      <div className="text-lg font-bold text-amber-500">Elevated</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="oxygen" className="space-y-4">
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      value: {
                        label: "Oxygen Saturation",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={oxygenData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}`}
                          domain={[90, 100]}
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
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Current</div>
                      <div className="text-2xl font-bold">{oxygenData[oxygenData.length - 1].value}%</div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Average</div>
                      <div className="text-2xl font-bold">
                        {Math.round(oxygenData.reduce((acc, item) => acc + item.value, 0) / oxygenData.length)}%
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Status</div>
                      <div className="text-lg font-bold text-green-500">Normal</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="temperature" className="space-y-4">
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      value: {
                        label: "Temperature",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}`}
                          domain={[36, 38]}
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
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Current</div>
                      <div className="text-2xl font-bold">{temperatureData[temperatureData.length - 1].value}°C</div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Average</div>
                      <div className="text-2xl font-bold">
                        {(
                          temperatureData.reduce((acc, item) => acc + Number.parseFloat(item.value), 0) /
                          temperatureData.length
                        ).toFixed(1)}
                        °C
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Status</div>
                      <div className="text-lg font-bold text-green-500">Normal</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="respiration" className="space-y-4">
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      value: {
                        label: "Respiration Rate",
                        color: "hsl(var(--chart-5))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={respirationData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}`}
                          domain={[10, 22]}
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
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Current</div>
                      <div className="text-2xl font-bold">{respirationData[respirationData.length - 1].value} BPM</div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Average</div>
                      <div className="text-2xl font-bold">
                        {Math.round(
                          respirationData.reduce((acc, item) => acc + item.value, 0) / respirationData.length,
                        )}{" "}
                        BPM
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-none">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground">Status</div>
                      <div className="text-lg font-bold text-green-500">Normal</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

