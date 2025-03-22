"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video } from "lucide-react"
import { generateIndianPatients } from "@/data/india-health-data"

export function UpcomingAppointments() {
  // Generate Indian patients
  const patients = generateIndianPatients(4)

  const appointments = patients.map((patient, index) => ({
    id: index + 1,
    patient: {
      name: patient.name,
      avatar: "/placeholder.svg?height=40&width=40",
      initials: patient.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    },
    date: index < 2 ? "Today" : "Tomorrow",
    time: index === 0 ? "14:00" : index === 1 ? "16:30" : index === 2 ? "10:00" : "13:15",
    type: index % 3 === 0 ? "In-person" : "Virtual",
    reason: patient.condition,
    hospital: patient.hospital,
  }))

  return (
    <Card className="glass-card border-none">
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Your schedule for the next 48 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-start gap-4 rounded-lg glass p-4">
              <Avatar>
                <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                <AvatarFallback>{appointment.patient.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{appointment.patient.name}</p>
                <p className="text-sm">{appointment.reason}</p>
                <p className="text-xs text-muted-foreground">{appointment.hospital}</p>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {appointment.date}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {appointment.time}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {appointment.type === "Virtual" ? <Video className="mr-1 h-3 w-3" /> : null}
                    {appointment.type}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className={
                  appointment.type === "Virtual"
                    ? "bg-primary/20 text-primary hover:bg-primary/30 border-none"
                    : "glass-button border-none"
                }
              >
                {appointment.type === "Virtual" ? "Join" : "View"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

