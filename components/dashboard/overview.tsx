"use client"

import { useEffect, useState } from "react"
import {
  Activity,
  Brain,
  Heart,
  Users,
  IndianRupeeIcon as Rupee,
  Hospital,
  Stethoscope,
  ShieldAlert,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientVitals } from "@/components/dashboard/patient-vitals"
import { RecentAlerts } from "@/components/dashboard/recent-alerts"
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments"
import { DiseaseDistributionChart } from "@/components/charts/disease-distribution-chart"
import { DiabetesPrevalenceChart } from "@/components/charts/diabetes-prevalence-chart"
import { HypertensionChart } from "@/components/charts/hypertension-chart"
import { HealthcareAccessChart } from "@/components/charts/healthcare-access-chart"
import { HealthInsuranceChart } from "@/components/charts/health-insurance-chart"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/components/language-selector"

export function DashboardOverview() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Patients",
            value: "1,24,856",
            change: "+12% from last month",
            icon: Users,
          },
          {
            title: "Active Monitoring",
            value: "34,219",
            change: "+4% from last week",
            icon: Activity,
          },
          {
            title: "Critical Alerts",
            value: "82",
            change: "-2 from yesterday",
            icon: Heart,
          },
          {
            title: "AI Predictions",
            value: "2,418",
            change: "+6 new insights",
            icon: Brain,
          },
        ].map((item, index) => (
          <Card
            key={index}
            className={cn(
              "glass-card border-none transition-all duration-500 opacity-0 translate-y-4",
              isLoaded && "opacity-100 translate-y-0",
              isLoaded && `transition-delay-${index * 100}`,
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-text">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Avg. Treatment Cost",
            value: "₹12,450",
            change: "-5% with AI recommendations",
            icon: Rupee,
          },
          {
            title: "Hospital Network",
            value: "1,248",
            change: "+15 new this month",
            icon: Hospital,
          },
          {
            title: "Doctors Available",
            value: "8,542",
            change: "Across 32 specialties",
            icon: Stethoscope,
          },
          {
            title: "Verified Medicines",
            value: "12,845",
            change: "100% blockchain secured",
            icon: ShieldAlert,
          },
        ].map((item, index) => (
          <Card
            key={index}
            className={cn(
              "glass-card border-none transition-all duration-500 opacity-0 translate-y-4",
              isLoaded && "opacity-100 translate-y-0",
              isLoaded && `transition-delay-${index * 100 + 400}`,
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-text">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs
        defaultValue="vitals"
        className={cn(
          "space-y-4 transition-all duration-500 opacity-0 translate-y-4",
          isLoaded && "opacity-100 translate-y-0 transition-delay-800",
        )}
      >
        <TabsList className="glass border-none">
          <TabsTrigger value="vitals">{t("Patient Vitals")}</TabsTrigger>
          <TabsTrigger value="alerts">{t("Recent Alerts")}</TabsTrigger>
          <TabsTrigger value="appointments">{t("Upcoming Appointments")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("Analytics")}</TabsTrigger>
        </TabsList>
        <TabsContent value="vitals" className="space-y-4">
          <PatientVitals />
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <RecentAlerts />
        </TabsContent>
        <TabsContent value="appointments" className="space-y-4">
          <UpcomingAppointments />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <DiseaseDistributionChart />
            <DiabetesPrevalenceChart />
            <HypertensionChart />
            <HealthcareAccessChart />
            <HealthInsuranceChart />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

