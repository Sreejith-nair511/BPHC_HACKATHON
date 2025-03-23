"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { Html } from "@react-three/drei"

// This is a placeholder model - in a real app, you would use a detailed human body model
export default function HumanModel() {
  const group = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const [hoveredPart, setHoveredPart] = useState("")

  // Rotate the model slightly
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.003
    }
  })

  // Body parts and their health information
  const bodyParts = [
    { name: "head", position: [0, 0.8, 0], scale: [0.2, 0.2, 0.2], info: "Brain, Eyes, Ears, Nose, Mouth" },
    { name: "chest", position: [0, 0.4, 0], scale: [0.3, 0.3, 0.2], info: "Heart, Lungs, Respiratory System" },
    {
      name: "abdomen",
      position: [0, 0, 0],
      scale: [0.3, 0.3, 0.2],
      info: "Stomach, Liver, Intestines, Digestive System",
    },
    { name: "leftArm", position: [-0.4, 0.3, 0], scale: [0.1, 0.4, 0.1], info: "Arm, Elbow, Hand" },
    { name: "rightArm", position: [0.4, 0.3, 0], scale: [0.1, 0.4, 0.1], info: "Arm, Elbow, Hand" },
    { name: "leftLeg", position: [-0.2, -0.5, 0], scale: [0.1, 0.5, 0.1], info: "Leg, Knee, Foot" },
    { name: "rightLeg", position: [0.2, -0.5, 0], scale: [0.1, 0.5, 0.1], info: "Leg, Knee, Foot" },
  ]

  return (
    <group ref={group}>
      {bodyParts.map((part) => (
        <mesh
          key={part.name}
          position={part.position}
          scale={part.scale}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
            setHoveredPart(part.name)
          }}
          onPointerOut={() => {
            setHovered(false)
            setHoveredPart("")
          }}
          onClick={(e) => {
            e.stopPropagation()
            setActive(!active)
          }}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={hoveredPart === part.name ? "#ff6b6b" : "#3a86ff"} transparent opacity={0.8} />
          {hoveredPart === part.name && (
            <Html position={[0, 0, 0]} className="pointer-events-none">
              <div className="w-40 rounded-md bg-background p-2 text-center shadow-lg">
                <p className="text-sm font-bold">{part.name.charAt(0).toUpperCase() + part.name.slice(1)}</p>
                <p className="text-xs text-muted-foreground">{part.info}</p>
              </div>
            </Html>
          )}
        </mesh>
      ))}
    </group>
  )
}

