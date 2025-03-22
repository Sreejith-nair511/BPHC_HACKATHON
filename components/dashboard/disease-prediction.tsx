"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Brain, FileText, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import { useTranslation } from "@/components/language-selector"

// Sample risk factors
const riskFactors = [
  { name: "Age", value: 35 },
  { name: "BMI", value: 24.5 },
  { name: "Blood Pressure", value: "120/80" },
  { name: "Cholesterol", value: "180 mg/dL" },
  { name: "Blood Sugar", value: "95 mg/dL" },
  { name: "Family History", value: "Positive" },
  { name: "Smoking", value: "Non-smoker" },
  { name: "Physical Activity", value: "Moderate" },
]

// Sample disease predictions
const diseasePredictions = [
  { name: "Type 2 Diabetes", risk: 15 },
  { name: "Hypertension", risk: 25 },
  { name: "Coronary Heart Disease", risk: 12 },
  { name: "Stroke", risk: 8 },
  { name: "Chronic Kidney Disease", risk: 5 },
]

export function DiseasePrediction() {
  const [activeTab, setActiveTab] = useState("risk-assessment")
  const [isLoading, setIsLoading] = useState(false)
  const [predictionResult, setPredictionResult] = useState<null | { disease: string; probability: number }>(null)
  const { t } = useTranslation()

  const handlePrediction = () => {
    setIsLoading(true)
    // Simulate API call for prediction
    setTimeout(() => {
      setPredictionResult({
        disease: "Type 2 Diabetes",
        probability: 15,
      })
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("disease_prediction")}</h1>
          <p className="text-muted-foreground">AI-powered disease risk assessment and early detection system.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="glass-button border-none">
            <FileText className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Brain className="h-4 w-4 mr-2" />
            New Assessment
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="glass border-none">
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="symptom-analysis">Symptom Analysis</TabsTrigger>
          <TabsTrigger value="genetic-factors">Genetic Factors</TabsTrigger>
          <TabsTrigger value="prediction-history">Prediction History</TabsTrigger>
        </TabsList>

        <TabsContent value="risk-assessment" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 glass-card border-none">
              <CardHeader>
                <CardTitle>Risk Factors</CardTitle>
                <CardDescription>Current health parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskFactors.map((factor, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{factor.name}</span>
                      <span className="text-sm font-medium">{factor.value}</span>
                    </div>
                  ))}
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90">Update Risk Factors</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 glass-card border-none">
              <CardHeader>
                <CardTitle>Disease Risk Prediction</CardTitle>
                <CardDescription>AI-calculated risk percentages based on your health data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      risk: {
                        label: "Risk Percentage",
                        color: "hsl(var(--primary))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={diseasePredictions} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                        <YAxis type="category" dataKey="name" width={150} />
                        <Tooltip
                          formatter={(value: number) => [`${value}%`, "Risk"]}
                          contentStyle={{
                            background: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="risk" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} animationDuration={1500}>
                          {diseasePredictions.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.risk > 20 ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    These predictions are based on your current health data and lifestyle factors. Regular check-ups and
                    preventive measures can help reduce these risks.
                  </p>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <p className="text-sm text-amber-500">
                      Your risk for Hypertension is higher than average for your age group.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="symptom-analysis" className="space-y-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle>Symptom Analysis</CardTitle>
              <CardDescription>Enter your symptoms for AI-based disease prediction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-symptom">Primary Symptom</Label>
                    <Select>
                      <SelectTrigger id="primary-symptom" className="glass-input">
                        <SelectValue placeholder="Select primary symptom" />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="fever">Fever</SelectItem>
                        <SelectItem value="cough">Cough</SelectItem>
                        <SelectItem value="headache">Headache</SelectItem>
                        <SelectItem value="fatigue">Fatigue</SelectItem>
                        <SelectItem value="nausea">Nausea</SelectItem>
                        <SelectItem value="pain">Pain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondary-symptoms">Secondary Symptoms</Label>
                    <Select>
                      <SelectTrigger id="secondary-symptoms" className="glass-input">
                        <SelectValue placeholder="Select secondary symptoms" />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="sore-throat">Sore Throat</SelectItem>
                        <SelectItem value="runny-nose">Runny Nose</SelectItem>
                        <SelectItem value="body-ache">Body Ache</SelectItem>
                        <SelectItem value="dizziness">Dizziness</SelectItem>
                        <SelectItem value="shortness-breath">Shortness of Breath</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="symptom-duration">Symptom Duration</Label>
                    <Select>
                      <SelectTrigger id="symptom-duration" className="glass-input">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="weeks">Weeks</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="symptom-severity">Symptom Severity</Label>
                    <div className="pt-2">
                      <Slider id="symptom-severity" defaultValue={[3]} max={10} step={1} className="w-full" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs">Mild</span>
                        <span className="text-xs">Moderate</span>
                        <span className="text-xs">Severe</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional-notes">Additional Notes</Label>
                    <textarea
                      id="additional-notes"
                      className="w-full h-20 glass-input rounded-md p-2"
                      placeholder="Any other details about your symptoms..."
                    />
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handlePrediction}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Symptoms
                      </>
                    ) : (
                      "Analyze Symptoms"
                    )}
                  </Button>
                </div>

                <div>
                  {predictionResult ? (
                    <div className="glass-card p-6 h-full">
                      <h3 className="text-lg font-semibold mb-4">Prediction Result</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Possible Condition:</span>
                          <span className="text-sm font-medium">{predictionResult.disease}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Probability:</span>
                          <span className="text-sm font-medium">{predictionResult.probability}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${predictionResult.probability}%` }}
                          ></div>
                        </div>
                        <div className="pt-4 border-t border-white/10">
                          <h4 className="text-sm font-medium mb-2">Recommended Actions:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Schedule a consultation with your primary care physician</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Monitor your symptoms and track any changes</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Stay hydrated and get adequate rest</span>
                            </li>
                          </ul>
                        </div>
                        <div className="pt-4">
                          <p className="text-xs text-muted-foreground">
                            This is an AI-generated prediction and should not replace professional medical advice.
                            Please consult a healthcare provider for proper diagnosis.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card p-6 h-full flex flex-col items-center justify-center text-center">
                      <Brain className="h-16 w-16 text-primary/50 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">AI Symptom Analysis</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Enter your symptoms on the left and click "Analyze Symptoms" to get an AI-powered prediction of
                        possible conditions.
                      </p>
                      <div className="w-full p-3 bg-primary/10 rounded-md">
                        <p className="text-xs">
                          Our AI has been trained on millions of medical records and can identify patterns that may
                          indicate specific health conditions.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="genetic-factors" className="space-y-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle>Genetic Risk Analysis</CardTitle>
              <CardDescription>Upload genetic test results or enter family history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="glass-card p-4">
                    <h3 className="text-sm font-medium mb-3">Upload Genetic Test Results</h3>
                    <div className="border-2 border-dashed border-white/20 rounded-md p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your genetic test results or click to browse
                      </p>
                      <Button variant="outline" className="glass-button border-none">
                        Browse Files
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, CSV, TXT (Max 10MB)</p>
                    </div>
                  </div>

                  <div className="glass-card p-4">
                    <h3 className="text-sm font-medium mb-3">Family Medical History</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="diabetes-history" className="text-sm">
                          Diabetes
                        </Label>
                        <Switch id="diabetes-history" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="heart-disease-history" className="text-sm">
                          Heart Disease
                        </Label>
                        <Switch id="heart-disease-history" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="cancer-history" className="text-sm">
                          Cancer
                        </Label>
                        <Switch id="cancer-history" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="hypertension-history" className="text-sm">
                          Hypertension
                        </Label>
                        <Switch id="hypertension-history" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="alzheimers-history" className="text-sm">
                          Alzheimer's
                        </Label>
                        <Switch id="alzheimers-history" />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">Analyze Genetic Factors</Button>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">How Genetic Analysis Works</h3>
                  <div className="space-y-4">
                    <p className="text-sm">
                      Our AI analyzes your genetic data and family history to identify potential genetic risk factors
                      for various diseases.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <span className="text-xs font-medium">1</span>
                        </div>
                        <p className="text-sm">
                          Upload your genetic test results from services like 23andMe, Ancestry, etc.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <span className="text-xs font-medium">2</span>
                        </div>
                        <p className="text-sm">
                          Enter your family medical history for conditions with known genetic links
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <span className="text-xs font-medium">3</span>
                        </div>
                        <p className="text-sm">
                          Our AI analyzes the data to identify genetic markers associated with disease risk
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <span className="text-xs font-medium">4</span>
                        </div>
                        <p className="text-sm">
                          Receive a detailed report with personalized prevention recommendations
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-md mt-4">
                      <p className="text-xs text-muted-foreground">
                        Your genetic data is encrypted and securely stored. We never share your genetic information with
                        third parties without your explicit consent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prediction-history" className="space-y-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle>Prediction History</CardTitle>
              <CardDescription>View your past disease predictions and assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="glass p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">Risk Assessment #{item}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(Date.now() - item * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="glass-button border-none">
                        View Details
                      </Button>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="text-xs">
                        <span className="text-muted-foreground">Top Risk:</span>{" "}
                        <span className="font-medium">
                          {["Type 2 Diabetes", "Hypertension", "Heart Disease", "Stroke", "Obesity"][item - 1]}
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Risk Level:</span>{" "}
                        <span className="font-medium">{["Moderate", "High", "Low", "Moderate", "Low"][item - 1]}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Assessment Type:</span>{" "}
                        <span className="font-medium">
                          {["Risk Factors", "Symptoms", "Genetic", "Risk Factors", "Symptoms"][item - 1]}
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Follow-up:</span>{" "}
                        <span className="font-medium">
                          {["Completed", "Pending", "Not Required", "Completed", "Pending"][item - 1]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

