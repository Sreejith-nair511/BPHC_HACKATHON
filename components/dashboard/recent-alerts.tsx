"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { generateIndianPatients } from "@/data/india-health-data"

export function RecentAlerts() {
  // Generate Indian patients with alerts
  const patients = generateIndianPatients(5)

  const alerts = patients.map((patient, index) => ({
    id: index + 1,
    patient: {
      name: patient.name,
      avatar: "/placeholder.svg?height=40&width=40",
      initials: patient.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    },
    type: patient.status,
    message:
      patient.status === "Critical"
        ? `Heart rate elevated to 120 BPM`
        : patient.status === "Warning"
          ? `Blood pressure rising: 140/95`
          : `Medication reminder sent`,
    time: `${Math.floor(Math.random() * 60)} minutes ago`,
    condition: patient.condition,
    hospital: patient.hospital,
  }))

  return (
    <Card className="glass-card border-none">
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>Notifications requiring attention in the last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-4 rounded-lg glass p-4">
              <Avatar>
                <AvatarImage src={alert.patient.avatar} alt={alert.patient.name} />
                <AvatarFallback>{alert.patient.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none">{alert.patient.name}</p>
                  <Badge
                    variant={
                      alert.type === "Critical" ? "destructive" : alert.type === "Warning" ? "default" : "secondary"
                    }
                    className={
                      alert.type === "Critical"
                        ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 border-none"
                        : alert.type === "Warning"
                          ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-none"
                          : "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-none"
                    }
                  >
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-sm">{alert.message}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>{alert.time}</span>
                  <span>•</span>
                  <span>{alert.condition}</span>
                  <span>•</span>
                  <span>{alert.hospital}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="glass-button border-none">
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

