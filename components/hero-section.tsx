"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Shield, Brain, Activity, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/components/language-selector"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        {/* Background decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse-glow"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-50 animate-pulse-glow"></div>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div
              className={cn(
                "space-y-2 transition-all duration-1000 opacity-0 translate-y-8",
                isVisible && "opacity-100 translate-y-0",
              )}
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none glow">
                <span className="gradient-text">AI-Powered Healthcare</span> for India
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Transforming healthcare across India with advanced AI, blockchain security, and real-time analytics.
                Accessible, affordable, and personalized care for all.
              </p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-2 min-[400px]:flex-row transition-all duration-1000 delay-300 opacity-0 translate-y-8",
                isVisible && "opacity-100 translate-y-0",
              )}
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 transition-all duration-300 group">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="glass-button border-none">
                <Link href="/demo">Request Demo</Link>
              </Button>
            </div>
            <div
              className={cn(
                "flex items-center gap-4 text-sm transition-all duration-1000 delay-500 opacity-0 translate-y-8",
                isVisible && "opacity-100 translate-y-0",
              )}
            >
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-primary" />
                <span>Blockchain Secured</span>
              </div>
              <div className="flex items-center gap-1">
                <Brain className="h-4 w-4 text-primary" />
                <span>AI Powered</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="h-4 w-4 text-primary" />
                <span>Real-time Monitoring</span>
              </div>
            </div>
          </div>
          <div
            className={cn(
              "flex items-center justify-center transition-all duration-1000 delay-700 opacity-0 translate-y-8",
              isVisible && "opacity-100 translate-y-0",
            )}
          >
            <div className="relative h-[450px] w-full">
              <div className="absolute inset-0 glass-card overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Animated elements */}
                    <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/20 animate-float-slow"></div>
                    <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-purple-500/20 animate-float"></div>
                    <div className="absolute top-1/2 right-20 w-12 h-12 rounded-full bg-blue-500/20 animate-float-fast"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="inline-block glass-card px-4 py-2 text-sm mb-4 animate-pulse-glow">
                          <Zap className="inline-block mr-2 h-4 w-4 text-primary" />
                          <span>Serving 1.4 Billion Indians</span>
                        </div>
                        <div className="text-2xl font-medium gradient-text glow-sm">
                          The Future of Indian Healthcare
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          Trusted by 1,200+ hospitals across India
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

