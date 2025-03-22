import type React from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { LanguageSelector } from "@/components/language-selector"
import { AccessibilityMenu } from "@/components/accessibility-menu"
import {
  HeartPulse,
  Activity,
  Smartphone,
  Hospital,
  AlertTriangle,
  FileText,
  Languages,
  Users,
  ShieldCheck,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <HeartPulse className="h-6 w-6 text-primary" />
              <span className="font-bold">VittalSync</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <AccessibilityMenu />
            <ThemeToggle />
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Next-Gen Healthcare Monitoring
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    VittalSync integrates Kadambini wearable devices with the Rukhmabai platform for comprehensive
                    healthcare monitoring and management.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]">
                  <HealthAnimation />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Transforming Healthcare in India</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  VittalSync is dedicated to making healthcare more accessible, efficient, and responsive through
                  innovative technology solutions tailored for Indian healthcare needs.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8">Our Integrated Solution</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-background rounded-lg border p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Smartphone className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold">Kadambini</h4>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Our IoT wearable device that tracks vital signs including heart rate, SpO2, ECG, body temperature,
                    and provides fall detection.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      <span>Real-time vital monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-primary" />
                      <span>Fall detection & emergency alerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <HeartPulse className="h-4 w-4 text-primary" />
                      <span>ECG & heart health tracking</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-background rounded-lg border p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Hospital className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold">Rukhmabai</h4>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Our web-based platform for patients, doctors, and hospitals to securely manage healthcare data,
                    track vitals, and respond to emergencies.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>Medical records management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Hospital className="h-4 w-4 text-primary" />
                      <span>ICU & ventilator tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Patient-doctor communication</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comprehensive Healthcare Solution</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  VittalSync provides tailored experiences for patients, doctors, and hospital management with
                  cutting-edge technology.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Smartphone className="h-10 w-10" />}
                title="Wearable Integration"
                description="Seamless integration with Kadambini wearable devices for real-time health monitoring."
              />
              <FeatureCard
                icon={<Hospital className="h-10 w-10" />}
                title="ICU & Ventilator Tracking"
                description="Real-time monitoring of ICU bed and ventilator availability across hospitals."
              />
              <FeatureCard
                icon={<AlertTriangle className="h-10 w-10" />}
                title="Emergency Alerts"
                description="Automatic detection and notification for critical health conditions."
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10" />}
                title="Medical Records"
                description="Secure storage and management of patient medical history and documents."
              />
              <FeatureCard
                icon={<Languages className="h-10 w-10" />}
                title="Accessibility"
                description="Regional language support and accessibility features for all users."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-10 w-10" />}
                title="Secure Access"
                description="Role-based authentication and secure data management for privacy."
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to transform healthcare?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join VittalSync today and experience the future of healthcare monitoring.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button size="lg">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="font-bold">VittalSync</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">© 2025 VittalSync. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 transition-all hover:bg-accent">
      <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-center text-muted-foreground">{description}</p>
    </div>
  )
}

function HealthAnimation() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-primary/10 animate-pulse"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="h-48 w-48 text-primary" viewBox="0 0 100 100">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            d="M 10,50 Q 25,20 40,50 T 70,50 T 100,50"
            className="animate-ecg"
          />
        </svg>
      </div>
    </div>
  )
}

