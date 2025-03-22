"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Activity, Brain, Heart, Shield, User, Hospital } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: React.ElementType
  value: string
  label: string
  delay: number
}

function StatCard({ icon: Icon, value, label, delay }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const numericValue = Number.parseInt(value.replace(/,/g, ""))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  useEffect(() => {
    if (isVisible) {
      let start = 0
      const end = numericValue
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start > end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isVisible, numericValue])

  return (
    <div
      ref={ref}
      className={cn(
        "glass-card p-6 transition-all duration-700 opacity-0 translate-y-8",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-muted-foreground">{label}</h3>
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <p className="text-3xl font-bold gradient-text">{isVisible ? count.toLocaleString() : "0"}</p>
    </div>
  )
}

export function StatsSection() {
  const stats = [
    {
      icon: User,
      value: "1,250,000",
      label: "Active Users",
    },
    {
      icon: Hospital,
      value: "5,400",
      label: "Partner Hospitals",
    },
    {
      icon: Activity,
      value: "24,700",
      label: "Daily Monitored Patients",
    },
    {
      icon: Brain,
      value: "98,500",
      label: "AI Predictions",
    },
    {
      icon: Shield,
      value: "10,000,000",
      label: "Secured Medical Records",
    },
    {
      icon: Heart,
      value: "125,000",
      label: "Lives Improved",
    },
  ]

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden" id="stats">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-background/90 to-background"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative">
        <div
          className={cn(
            "flex flex-col items-center justify-center space-y-4 text-center transition-all duration-700 opacity-0 translate-y-8",
            isVisible && "opacity-100 translate-y-0",
          )}
        >
          <div className="space-y-2">
            <div className="inline-block glass-card px-3 py-1 text-sm text-primary">Impact</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text glow-sm">
              Transforming Healthcare Globally
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform is making a real difference in healthcare delivery and patient outcomes
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {stats.map((stat, index) => (
            <StatCard key={index} icon={stat.icon} value={stat.value} label={stat.label} delay={100 * index} />
          ))}
        </div>
      </div>
    </section>
  )
}

