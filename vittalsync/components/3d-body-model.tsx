"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei"
import { Badge } from "@/components/ui/badge"
import type * as THREE from "three"

export function BodyModel3D({
  affectedParts = [],
  showLabels = true,
  autoRotate = true,
}: {
  affectedParts?: Array<{
    part: string
    position: [number, number, number]
    condition?: string
    severity?: "low" | "medium" | "high"
  }>
  showLabels?: boolean
  autoRotate?: boolean
}) {
  return (
    <div className="h-[400px] w-full rounded-lg border bg-background">
      <Canvas camera={{ position: [0, 1.5, 2.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Model affectedParts={affectedParts} showLabels={showLabels} />

        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          enableZoom={true}
          enablePan={true}
          minDistance={1.5}
          maxDistance={4}
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}

function Model({
  affectedParts,
  showLabels,
}: {
  affectedParts: Array<{
    part: string
    position: [number, number, number]
    condition?: string
    severity?: "low" | "medium" | "high"
  }>
  showLabels: boolean
}) {
  const group = useRef<THREE.Group>(null)

  // Use a placeholder model (in a real app, you'd use a detailed human body model)
  const { scene } = useGLTF("/assets/3d/duck.glb")

  useFrame(() => {
    if (group.current) {
      // Optional animations could be added here
    }
  })

  return (
    <group ref={group}>
      <primitive object={scene} scale={1} position={[0, -1, 0]} />

      {showLabels &&
        affectedParts.map((part, index) => (
          <BodyPartMarker
            key={index}
            position={part.position}
            part={part.part}
            condition={part.condition}
            severity={part.severity}
          />
        ))}
    </group>
  )
}

function BodyPartMarker({
  position,
  part,
  condition,
  severity = "medium",
}: {
  position: [number, number, number]
  part: string
  condition?: string
  severity?: "low" | "medium" | "high"
}) {
  const [hovered, setHovered] = useState(false)

  const color = severity === "high" ? "#ef4444" : severity === "medium" ? "#f59e0b" : "#3b82f6"

  return (
    <group position={position}>
      {/* Pulsing sphere to mark the affected area */}
      <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Label that appears when hovered */}
      {hovered && (
        <Html position={[0, 0.1, 0]} center>
          <div className="bg-background border rounded-lg shadow-lg p-2 min-w-32 text-center">
            <p className="font-medium text-sm">{part}</p>
            {condition && (
              <div className="mt-1">
                <Badge
                  variant="outline"
                  className={
                    severity === "high"
                      ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                      : severity === "medium"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                        : "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                  }
                >
                  {condition}
                </Badge>
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  )
}

