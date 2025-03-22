"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface DynamicBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function DynamicBackground({ children, className }: DynamicBackgroundProps) {
  const { theme } = useTheme()
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "night">("morning")
  const [contrast, setContrast] = useState<"normal" | "high">("normal")

  useEffect(() => {
    // Set time of day based on current hour
    const updateTimeOfDay = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 12) {
        setTimeOfDay("morning")
      } else if (hour >= 12 && hour < 17) {
        setTimeOfDay("afternoon")
      } else if (hour >= 17 && hour < 20) {
        setTimeOfDay("evening")
      } else {
        setTimeOfDay("night")
      }
    }

    updateTimeOfDay()
    const interval = setInterval(updateTimeOfDay, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Background gradients based on time of day and theme
  const getBackgroundClass = () => {
    if (theme === "light") {
      switch (timeOfDay) {
        case "morning":
          return "bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100"
        case "afternoon":
          return "bg-gradient-to-br from-blue-50 via-white to-blue-50"
        case "evening":
          return "bg-gradient-to-br from-orange-50 via-pink-50 to-purple-100"
        case "night":
          return "bg-gradient-to-br from-indigo-100 via-blue-100 to-indigo-200"
      }
    } else {
      switch (timeOfDay) {
        case "morning":
          return "bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950"
        case "afternoon":
          return "bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900"
        case "evening":
          return "bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950"
        case "night":
          return "bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900"
      }
    }
  }

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-1000 ease-in-out",
        getBackgroundClass(),
        contrast === "high" ? "elder-friendly-high-contrast" : "",
        className,
      )}
    >
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setContrast(contrast === "normal" ? "high" : "normal")}
          className="glass-button px-3 py-1 text-xs rounded-full"
          aria-label="Toggle high contrast mode"
        >
          {contrast === "normal" ? "High Contrast" : "Normal Contrast"}
        </button>
      </div>
      {children}
    </div>
  )
}

