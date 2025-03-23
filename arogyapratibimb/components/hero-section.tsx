"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import HumanModel from "./human-model"
import { AccessibilityIcon, HeartPulse, Languages, Volume2 } from "lucide-react"

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="py-12 md:py-24">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">ArogyaPratibimb</h1>
            <p className="text-xl text-muted-foreground">India's Digital Health Twin</p>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Visualize your health in 3D. Understand symptoms, get disease insights, and access health tips in your
              language.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild size="lg">
              <Link href="/symptom-checker">Check Your Symptoms</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/diseases">Explore Diseases</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Multiple Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <AccessibilityIcon className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Accessible Design</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Voice Assistance</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Health Alerts</span>
            </div>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg bg-muted md:h-[500px]">
          <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <HumanModel />
            <OrbitControls enableZoom={false} />
            <Environment preset="city" />
          </Canvas>
        </div>
      </div>
    </section>
  )
}

