"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EmergencyAlertProps {
  patient?: {
    name: string
    id: string
    room?: string
  }
  alert: {
    type: string
    value?: string | number
    threshold?: string | number
    time: Date | string
    severity: "critical" | "high" | "medium" | "low"
  }
  onDismiss?: () => void
  onRespond?: () => void
}

export function EmergencyAlert({ patient, alert, onDismiss, onRespond }: EmergencyAlertProps) {
  const [visible, setVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // Auto-dismiss after 30 seconds if not critical
    if (alert.severity !== "critical") {
      const timer = setTimeout(() => {
        setVisible(false)
        onDismiss?.()
      }, 30000)

      return () => clearTimeout(timer)
    }

    // Stop pulsing animation after 10 seconds
    const animTimer = setTimeout(() => {
      setIsAnimating(false)
    }, 10000)

    return () => clearTimeout(animTimer)
  }, [alert.severity, onDismiss])

  if (!visible) return null

  const formatTime = (time: Date | string) => {
    if (typeof time === "string") return time
    return time.toLocaleTimeString()
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 border-red-300 dark:border-red-800"
      case "high":
        return "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400 border-orange-300 dark:border-orange-800"
      case "medium":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-300 dark:border-amber-800"
      default:
        return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 border-blue-300 dark:border-blue-800"
    }
  }

  const alertTitle = () => {
    if (alert.type === "heart_rate") return "Abnormal Heart Rate"
    if (alert.type === "oxygen") return "Low Oxygen Level"
    if (alert.type === "temperature") return "Abnormal Temperature"
    if (alert.type === "blood_pressure") return "Abnormal Blood Pressure"
    if (alert.type === "fall_detected") return "Fall Detected"
    return alert.type.replace(/_/g, " ")
  }

  const alertDescription = () => {
    if (alert.type === "heart_rate") {
      return `Heart rate ${alert.value} bpm exceeds threshold of ${alert.threshold} bpm`
    }
    if (alert.type === "oxygen") {
      return `Oxygen level ${alert.value}% below threshold of ${alert.threshold}%`
    }
    if (alert.type === "temperature") {
      return `Temperature ${alert.value}°C exceeds threshold of ${alert.threshold}°C`
    }
    if (alert.type === "blood_pressure") {
      return `Blood pressure ${alert.value} exceeds threshold of ${alert.threshold}`
    }
    if (alert.type === "fall_detected") {
      return "Patient fall detected. Immediate assistance required."
    }
    return "Requires immediate attention"
  }

  return (
    <Card className={`border-2 ${getSeverityColor(alert.severity)} ${isAnimating ? "animate-pulse" : ""}`}>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className={`h-5 w-5 ${alert.severity === "critical" ? "text-red-600" : "text-amber-600"}`} />
            {alertTitle()}
          </CardTitle>
          <CardDescription>
            {patient && `Patient: ${patient.name}`}
            {patient && patient.room && ` • Room: ${patient.room}`}
          </CardDescription>
        </div>
        <Badge variant={alert.severity === "critical" ? "destructive" : "outline"}>
          {alert.severity.toUpperCase()}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{alertDescription()}</p>
        <p className="mt-2 text-xs text-muted-foreground">Detected at {formatTime(alert.time)}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setVisible(false)
            onDismiss?.()
          }}
        >
          <X className="mr-2 h-4 w-4" />
          Dismiss
        </Button>
        <Button size="sm" onClick={onRespond}>
          Respond Now
        </Button>
      </CardFooter>
    </Card>
  )
}

