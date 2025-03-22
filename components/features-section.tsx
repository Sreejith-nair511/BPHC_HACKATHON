"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Activity, Brain, Shield, LineChart, Pill, Apple, Video, MessageSquare, Bed, BarChart4 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  delay: number
}

function FeatureCard({ icon: Icon, title, description, delay }: FeatureCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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

  return (
    <div
      ref={ref}
      className={cn(
        "glass-card p-6 transition-all duration-700 opacity-0 translate-y-8",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Based Disease Detection",
      description: "Predicts chronic disease risks using patient health records & wearable data.",
    },
    {
      icon: Activity,
      title: "Remote Patient Monitoring",
      description: "Live tracking of heart rate, blood pressure, oxygen levels with real-time alerts.",
    },
    {
      icon: LineChart,
      title: "Cost Comparison Platform",
      description: "Compare hospital treatment costs with AI-suggested affordable alternatives.",
    },
    {
      icon: Pill,
      title: "Medicine Verification",
      description: "Scan medicine barcodes to verify authenticity using blockchain records.",
    },
    {
      icon: Shield,
      title: "Blockchain Medical Records",
      description: "Decentralized storage of patient records with authorized access only.",
    },
    {
      icon: Apple,
      title: "AI Nutrition Planner",
      description: "Personalized meal plans based on health conditions & fitness goals.",
    },
    {
      icon: Video,
      title: "AR-Assisted Diagnosis",
      description: "Remote diagnosis using augmented reality with 3D medical visualization.",
    },
    {
      icon: MessageSquare,
      title: "Virtual Health Assistant",
      description: "AI chatbot for medication reminders, appointments, and health tips.",
    },
    {
      icon: Bed,
      title: "ICU Bed Availability",
      description: "Live dashboard showing ICU & ventilator availability with automatic updates.",
    },
    {
      icon: BarChart4,
      title: "Insurance Analytics",
      description: "AI-powered risk assessment for personalized insurance policies.",
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
    <section ref={sectionRef} className="w-full py-12 md:py-24 lg:py-32" id="features">
      <div className="container px-4 md:px-6">
        <div
          className={cn(
            "flex flex-col items-center justify-center space-y-4 text-center transition-all duration-700 opacity-0 translate-y-8",
            isVisible && "opacity-100 translate-y-0",
          )}
        >
          <div className="space-y-2">
            <div className="inline-block glass-card px-3 py-1 text-sm text-primary">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text glow-sm">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              VitalSync integrates cutting-edge technology to provide a complete healthcare ecosystem
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={100 * index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

