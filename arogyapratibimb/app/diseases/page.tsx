import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Leaf, Pill } from "lucide-react"

export default function DiseasesPage() {
  const diseases = [
    {
      id: "dengue",
      name: "Dengue Fever",
      description:
        "A mosquito-borne viral disease common in tropical regions of India, especially during monsoon season.",
      symptoms: [
        "High fever",
        "Severe headache",
        "Pain behind the eyes",
        "Joint and muscle pain",
        "Rash",
        "Mild bleeding (nose or gums)",
      ],
      prevention:
        "Use mosquito repellents, wear long-sleeved clothing, eliminate standing water where mosquitoes breed.",
      modernTreatment:
        "No specific antiviral treatment exists. Management includes rest, hydration, pain relievers (avoiding aspirin), and monitoring for severe symptoms.",
      ayurvedicTreatment:
        "Herbs like Giloy (Tinospora cordifolia), Papaya leaf extract, and Neem are traditionally used to boost immunity and manage symptoms.",
      prevalence: "Endemic in many parts of India, with seasonal outbreaks during monsoon season.",
    },
    {
      id: "tuberculosis",
      name: "Tuberculosis (TB)",
      description: "A bacterial infection that primarily affects the lungs but can affect other parts of the body.",
      symptoms: [
        "Persistent cough (>3 weeks)",
        "Chest pain",
        "Coughing up blood",
        "Fatigue",
        "Weight loss",
        "Night sweats",
        "Fever",
      ],
      prevention:
        "BCG vaccination, early detection and treatment, improved ventilation, avoiding close contact with infected individuals.",
      modernTreatment: "Long-term antibiotic therapy (6-9 months) with multiple drugs under medical supervision.",
      ayurvedicTreatment:
        "Herbs like Vasaka (Adhatoda vasica), Tulsi (Holy Basil), and formulations like Sitopaladi Churna are traditionally used as adjunct therapy.",
      prevalence: "India has the highest TB burden in the world, with approximately 2.8 million cases annually.",
    },
    {
      id: "diabetes",
      name: "Diabetes Mellitus (Type 2)",
      description:
        "A metabolic disorder characterized by high blood sugar levels due to insulin resistance or insufficient insulin production.",
      symptoms: [
        "Increased thirst and urination",
        "Fatigue",
        "Blurred vision",
        "Slow-healing sores",
        "Frequent infections",
        "Unexplained weight loss",
      ],
      prevention:
        "Maintain healthy weight, regular physical activity, balanced diet low in refined carbohydrates and sugars.",
      modernTreatment:
        "Lifestyle modifications, oral medications (metformin, sulfonylureas), insulin therapy if needed, regular monitoring of blood glucose.",
      ayurvedicTreatment:
        "Herbs like Gurmar (Gymnema sylvestre), Jamun (Syzygium cumini), Fenugreek (Methi), and formulations like Chandraprabha Vati are traditionally used.",
      prevalence: "Over 77 million people in India have diabetes, making it the 'Diabetes Capital' of the world.",
    },
    {
      id: "hypertension",
      name: "Hypertension (High Blood Pressure)",
      description: "A condition where the force of blood against artery walls is consistently too high.",
      symptoms: [
        "Often asymptomatic",
        "Headaches",
        "Shortness of breath",
        "Nosebleeds",
        "Dizziness",
        "Chest pain (in severe cases)",
      ],
      prevention:
        "Reduce salt intake, maintain healthy weight, regular physical activity, limit alcohol, manage stress.",
      modernTreatment:
        "Lifestyle modifications, antihypertensive medications (ACE inhibitors, beta-blockers, diuretics, etc.).",
      ayurvedicTreatment:
        "Herbs like Arjuna (Terminalia arjuna), Brahmi (Bacopa monnieri), and practices like yoga and pranayama are traditionally recommended.",
      prevalence: "Approximately 200 million adults in India have hypertension, with many cases undiagnosed.",
    },
    {
      id: "malaria",
      name: "Malaria",
      description: "A mosquito-borne infectious disease caused by Plasmodium parasites.",
      symptoms: [
        "Fever and chills",
        "Headache",
        "Nausea and vomiting",
        "Muscle pain",
        "Fatigue",
        "Sweating",
        "Chest or abdominal pain",
      ],
      prevention:
        "Use mosquito nets and repellents, eliminate standing water, take preventive medications when traveling to endemic areas.",
      modernTreatment:
        "Antimalarial medications based on the type of parasite and severity (chloroquine, artemisinin-based combination therapies).",
      ayurvedicTreatment:
        "Herbs like Neem (Azadirachta indica), Tulsi (Holy Basil), and Chirayata (Swertia chirata) are traditionally used.",
      prevalence:
        "India accounts for about 2% of global malaria cases, with higher prevalence in rural and tribal areas.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Disease Encyclopedia</h1>

      <p className="mb-8 text-muted-foreground">
        Learn about common diseases in India, their symptoms, prevention methods, and treatment options from both modern
        medicine and Ayurveda.
      </p>

      <div className="grid gap-6">
        {diseases.map((disease) => (
          <Card key={disease.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{disease.name}</CardTitle>
              <CardDescription>{disease.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="modern">Modern Medicine</TabsTrigger>
                  <TabsTrigger value="ayurveda">Ayurveda</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 pt-4">
                  <div>
                    <h3 className="font-semibold mb-2">Symptoms</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {disease.symptoms.map((symptom, index) => (
                        <li key={index} className="text-muted-foreground">
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Prevention</h3>
                    <p className="text-muted-foreground">{disease.prevention}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Prevalence in India</h3>
                    <p className="text-muted-foreground">{disease.prevalence}</p>
                  </div>
                </TabsContent>

                <TabsContent value="modern" className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Pill className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Modern Medical Treatment</h3>
                      <p className="text-muted-foreground">{disease.modernTreatment}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ayurveda" className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Ayurvedic Approach</h3>
                      <p className="text-muted-foreground">{disease.ayurvedicTreatment}</p>
                      <div className="mt-4 flex items-center rounded-lg bg-amber-50 p-4 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                        <AlertCircle className="mr-2 h-5 w-5" />
                        <p className="text-sm">
                          Consult with a qualified Ayurvedic practitioner before starting any herbal treatment.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

