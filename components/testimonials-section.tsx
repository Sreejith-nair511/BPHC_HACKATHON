"use client"

import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  avatar: string
  initials: string
  delay: number
}

function TestimonialCard({ name, role, content, avatar, initials, delay }: TestimonialCardProps) {
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
      <div className="mb-4">
        <Quote className="h-8 w-8 text-primary/50" />
      </div>
      <p className="text-muted-foreground mb-6">"{content}"</p>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      content:
        "VitalSync has revolutionized how I monitor my patients. The real-time alerts have helped prevent several critical situations, and the AI predictions are remarkably accurate.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Patient",
      content:
        "Having control over my medical records while knowing they're secure gives me peace of mind. The nutrition planner has helped manage my diabetes better than any other solution I've tried.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    {
      name: "Lisa Rodriguez",
      role: "Hospital Administrator",
      content:
        "The ICU bed tracking system has optimized our resource allocation and improved emergency response times significantly. It's been a game-changer for our hospital network.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LR",
    },
    {
      name: "Robert Williams",
      role: "Insurance Provider",
      content:
        "The predictive analytics have transformed our risk assessment process, allowing us to offer more personalized policies while reducing fraud. The ROI has been exceptional.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RW",
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
    <section ref={sectionRef} className="w-full py-12 md:py-24 lg:py-32" id="testimonials">
      <div className="container px-4 md:px-6">
        <div
          className={cn(
            "flex flex-col items-center justify-center space-y-4 text-center transition-all duration-700 opacity-0 translate-y-8",
            isVisible && "opacity-100 translate-y-0",
          )}
        >
          <div className="space-y-2">
            <div className="inline-block glass-card px-3 py-1 text-sm text-primary">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text glow-sm">
              Trusted by Healthcare Professionals
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what doctors, patients, and healthcare administrators are saying about VitalSync
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 mt-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              avatar={testimonial.avatar}
              initials={testimonial.initials}
              delay={100 * index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

