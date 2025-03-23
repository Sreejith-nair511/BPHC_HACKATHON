"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import HumanModelWithHighlights from "@/components/human-model-with-highlights"
import { AlertCircle, ArrowRight } from "lucide-react"

const commonSymptoms = [
  { id: "fever", label: "Fever", bodyParts: ["head"] },
  { id: "headache", label: "Headache", bodyParts: ["head"] },
  { id: "cough", label: "Cough", bodyParts: ["chest"] },
  { id: "sore-throat", label: "Sore Throat", bodyParts: ["head"] },
  { id: "runny-nose", label: "Runny Nose", bodyParts: ["head"] },
  { id: "body-ache", label: "Body Ache", bodyParts: ["leftArm", "rightArm", "leftLeg", "rightLeg"] },
  { id: "fatigue", label: "Fatigue", bodyParts: ["chest", "abdomen"] },
  { id: "nausea", label: "Nausea", bodyParts: ["abdomen"] },
  { id: "vomiting", label: "Vomiting", bodyParts: ["abdomen"] },
  { id: "diarrhea", label: "Diarrhea", bodyParts: ["abdomen"] },
  { id: "chest-pain", label: "Chest Pain", bodyParts: ["chest"] },
  { id: "shortness-of-breath", label: "Shortness of Breath", bodyParts: ["chest"] },
  { id: "abdominal-pain", label: "Abdominal Pain", bodyParts: ["abdomen"] },
  { id: "joint-pain", label: "Joint Pain", bodyParts: ["leftArm", "rightArm", "leftLeg", "rightLeg"] },
  { id: "rash", label: "Rash", bodyParts: ["chest", "abdomen", "leftArm", "rightArm", "leftLeg", "rightLeg"] },
]

const possibleConditions = [
  {
    name: "Common Cold",
    symptoms: ["fever", "headache", "cough", "sore-throat", "runny-nose"],
    description: "A viral infection of the upper respiratory tract. Usually harmless and resolves within a week.",
    prevention: "Wash hands frequently, avoid close contact with sick people, and get adequate rest.",
    treatment: "Rest, hydration, over-the-counter cold medications for symptom relief.",
  },
  {
    name: "Influenza (Flu)",
    symptoms: ["fever", "headache", "cough", "body-ache", "fatigue"],
    description:
      "A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and lungs.",
    prevention: "Annual flu vaccination, good hand hygiene, and avoiding close contact with sick individuals.",
    treatment: "Rest, fluids, antiviral medications if prescribed by a doctor.",
  },
  {
    name: "Dengue Fever",
    symptoms: ["fever", "headache", "body-ache", "rash", "fatigue"],
    description: "A mosquito-borne viral disease common in tropical and subtropical regions, including India.",
    prevention: "Use mosquito repellents, wear long-sleeved clothing, and eliminate mosquito breeding sites.",
    treatment: "Hydration, pain relievers (avoid aspirin), and medical monitoring for severe symptoms.",
  },
  {
    name: "Gastroenteritis",
    symptoms: ["nausea", "vomiting", "diarrhea", "abdominal-pain", "fever"],
    description: "Inflammation of the stomach and intestines, typically resulting from bacterial or viral infections.",
    prevention: "Practice good hand hygiene, consume clean food and water, and maintain proper sanitation.",
    treatment: "Oral rehydration, bland diet, and medications to control symptoms if necessary.",
  },
  {
    name: "Tuberculosis (TB)",
    symptoms: ["cough", "fever", "fatigue", "shortness-of-breath", "chest-pain"],
    description: "A bacterial infection that primarily affects the lungs but can affect other parts of the body.",
    prevention: "BCG vaccination, early detection, and treatment of infected individuals.",
    treatment: "Long-term antibiotic therapy under medical supervision.",
  },
]

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [affectedBodyParts, setAffectedBodyParts] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms((prev) => {
      if (prev.includes(symptomId)) {
        return prev.filter((id) => id !== symptomId)
      } else {
        return [...prev, symptomId]
      }
    })

    // Update affected body parts
    const symptom = commonSymptoms.find((s) => s.id === symptomId)
    if (symptom) {
      setAffectedBodyParts((prev) => {
        const newParts = [...prev]

        if (prev.includes(symptomId)) {
          // Remove body parts associated with this symptom
          symptom.bodyParts.forEach((part) => {
            // Only remove if no other selected symptom affects this part
            const otherSymptomsAffectingPart = selectedSymptoms
              .filter((id) => id !== symptomId)
              .some((id) => {
                const s = commonSymptoms.find((s) => s.id === id)
                return s?.bodyParts.includes(part)
              })

            if (!otherSymptomsAffectingPart) {
              const index = newParts.indexOf(part)
              if (index !== -1) newParts.splice(index, 1)
            }
          })
        } else {
          // Add body parts associated with this symptom
          symptom.bodyParts.forEach((part) => {
            if (!newParts.includes(part)) {
              newParts.push(part)
            }
          })
        }

        return newParts
      })
    }
  }

  const getMatchingConditions = () => {
    if (selectedSymptoms.length === 0) return []

    return possibleConditions
      .map((condition) => {
        const matchingSymptoms = condition.symptoms.filter((s) => selectedSymptoms.includes(s))
        const matchPercentage = Math.round((matchingSymptoms.length / condition.symptoms.length) * 100)

        return {
          ...condition,
          matchingSymptoms,
          matchPercentage,
        }
      })
      .filter((condition) => condition.matchPercentage > 20)
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
  }

  const matchingConditions = getMatchingConditions()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Symptom Checker</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Select Your Symptoms</CardTitle>
              <CardDescription>Check all symptoms you are currently experiencing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {commonSymptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom.id}
                      checked={selectedSymptoms.includes(symptom.id)}
                      onCheckedChange={() => handleSymptomToggle(symptom.id)}
                    />
                    <label
                      htmlFor={symptom.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {symptom.label}
                    </label>
                  </div>
                ))}
              </div>

              <Button
                className="mt-6 w-full"
                onClick={() => setShowResults(true)}
                disabled={selectedSymptoms.length === 0}
              >
                Check Possible Conditions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {showResults && matchingConditions.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Possible Conditions</CardTitle>
                <CardDescription>Based on your symptoms, these conditions might be relevant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {matchingConditions.map((condition) => (
                    <div key={condition.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{condition.name}</h3>
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {condition.matchPercentage}% match
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{condition.description}</p>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Prevention:</p>
                        <p className="text-sm text-muted-foreground">{condition.prevention}</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Treatment:</p>
                        <p className="text-sm text-muted-foreground">{condition.treatment}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center rounded-lg bg-amber-50 p-4 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  <p className="text-sm">
                    This is not a medical diagnosis. Please consult a healthcare professional for proper evaluation.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {showResults && matchingConditions.length === 0 && selectedSymptoms.length > 0 && (
            <Card className="mt-8 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
              <CardHeader>
                <CardTitle className="text-amber-800 dark:text-amber-200">No Matching Conditions</CardTitle>
                <CardDescription className="text-amber-700 dark:text-amber-300">
                  We couldn't find specific conditions matching your combination of symptoms.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 dark:text-amber-300">
                  Please consult a healthcare professional for proper evaluation. You can also try selecting different
                  symptoms.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="h-[500px] rounded-lg bg-muted">
          <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <HumanModelWithHighlights highlightedParts={affectedBodyParts} />
            <OrbitControls enableZoom={false} />
            <Environment preset="city" />
          </Canvas>
        </div>
      </div>
    </div>
  )
}

