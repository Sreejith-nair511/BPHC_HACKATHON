"use client"

import { useEffect, useState } from "react"
import { Activity } from "lucide-react"

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 animate-pulse">
          <Activity className="h-12 w-12 text-primary animate-pulse" />
        </div>
      </div>
      <h1 className="mt-8 text-3xl font-bold gradient-text glow animate-pulse">VitalSync</h1>
      <p className="mt-2 text-muted-foreground">AI-Powered Healthcare Platform</p>
      <div className="mt-8 flex flex-col items-center">
        <div className="h-1 w-48 bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-[loading_2s_ease-in-out]"></div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Developed by srreejith and k debugger</p>
      </div>
    </div>
  )
}

