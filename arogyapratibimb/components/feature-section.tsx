import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertCircle, BookOpen, HeartPulse, Languages, Leaf, Phone, Pill } from "lucide-react"

export default function FeatureSection() {
  const features = [
    {
      icon: <Activity className="h-10 w-10 text-primary" />,
      title: "3D Human Body Model",
      description: "Interact with a 3D model to visualize health conditions and affected body parts.",
    },
    {
      icon: <AlertCircle className="h-10 w-10 text-primary" />,
      title: "Symptom Checker",
      description: "Enter your symptoms to get common disease predictions and health insights.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Disease Encyclopedia",
      description: "Comprehensive information about common Indian diseases, symptoms, and treatments.",
    },
    {
      icon: <Languages className="h-10 w-10 text-primary" />,
      title: "Multi-language Support",
      description: "Access health information in Hindi, Tamil, Telugu, and other Indian languages.",
    },
    {
      icon: <Leaf className="h-10 w-10 text-primary" />,
      title: "Ayurveda + Modern Medicine",
      description: "Get insights from both traditional Ayurvedic practices and modern medical science.",
    },
    {
      icon: <Phone className="h-10 w-10 text-primary" />,
      title: "Emergency Assistance",
      description: "Quick access to emergency contacts, nearby hospitals, and ambulance services.",
    },
    {
      icon: <HeartPulse className="h-10 w-10 text-primary" />,
      title: "Health Alerts & Reminders",
      description: "Personalized notifications for medication, check-ups, and health monitoring.",
    },
    {
      icon: <Pill className="h-10 w-10 text-primary" />,
      title: "Medication Tracker",
      description: "Keep track of your medications, dosages, and schedules with timely reminders.",
    },
  ]

  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            ArogyaPratibimb offers a comprehensive set of features designed specifically for Indian healthcare needs.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 transition-all hover:border-primary">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

