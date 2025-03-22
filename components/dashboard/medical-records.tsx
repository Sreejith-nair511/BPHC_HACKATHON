"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Upload, Download, Search, Filter, Plus, Calendar, User, Pill, Activity, Shield } from "lucide-react"
import { useTranslation } from "@/components/language-selector"
import { cn } from "@/lib/utils"

// Sample medical records
const medicalRecords = [
  {
    id: "REC-001",
    type: "Lab Report",
    date: "2023-12-15",
    provider: "Apollo Diagnostics",
    description: "Complete Blood Count (CBC)",
    status: "Normal",
  },
  {
    id: "REC-002",
    type: "Prescription",
    date: "2023-11-28",
    provider: "Dr. Sharma",
    description: "Hypertension Medication",
    status: "Active",
  },
  {
    id: "REC-003",
    type: "Imaging",
    date: "2023-10-05",
    provider: "City Hospital",
    description: "Chest X-Ray",
    status: "Normal",
  },
  {
    id: "REC-004",
    type: "Vaccination",
    date: "2023-09-12",
    provider: "Health Department",
    description: "COVID-19 Booster",
    status: "Completed",
  },
  {
    id: "REC-005",
    type: "Consultation",
    date: "2023-08-22",
    provider: "Dr. Patel",
    description: "Annual Check-up",
    status: "Follow-up Required",
  },
  {
    id: "REC-006",
    type: "Lab Report",
    date: "2023-07-18",
    provider: "MedLabs",
    description: "Lipid Profile",
    status: "Abnormal",
  },
  {
    id: "REC-007",
    type: "Prescription",
    date: "2023-06-30",
    provider: "Dr. Gupta",
    description: "Antibiotics for Infection",
    status: "Completed",
  },
  {
    id: "REC-008",
    type: "Imaging",
    date: "2023-05-14",
    provider: "Diagnostic Center",
    description: "Ultrasound Abdomen",
    status: "Normal",
  },
]

export function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [recordType, setRecordType] = useState("all")
  const { t } = useTranslation()

  // Filter records based on search term and type
  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch =
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = recordType === "all" || record.type.toLowerCase() === recordType.toLowerCase()

    return matchesSearch && matchesType
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("medical_records")}</h1>
          <p className="text-muted-foreground">Securely store and access your medical records on blockchain.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="glass-button border-none">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Upload className="h-4 w-4 mr-2" />
            Upload Record
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all-records" className="space-y-6">
        <TabsList className="glass border-none">
          <TabsTrigger value="all-records">All Records</TabsTrigger>
          <TabsTrigger value="lab-reports">Lab Reports</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
        </TabsList>

        <TabsContent value="all-records" className="space-y-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <CardTitle>Medical Records</CardTitle>
                  <CardDescription>View and manage your medical records</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search records..."
                      className="glass-input pl-8 w-full sm:w-[200px] md:w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={recordType} onValueChange={setRecordType}>
                    <SelectTrigger className="glass-input w-full sm:w-[150px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="lab report">Lab Reports</SelectItem>
                      <SelectItem value="prescription">Prescriptions</SelectItem>
                      <SelectItem value="imaging">Imaging</SelectItem>
                      <SelectItem value="vaccination">Vaccinations</SelectItem>
                      <SelectItem value="consultation">Consultations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <div key={record.id} className="glass p-4 rounded-lg">
                      <div className="flex flex-col sm:flex-row justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                            {record.type === "Lab Report" && <Activity className="h-5 w-5 text-primary" />}
                            {record.type === "Prescription" && <Pill className="h-5 w-5 text-primary" />}
                            {record.type === "Imaging" && <FileText className="h-5 w-5 text-primary" />}
                            {record.type === "Vaccination" && <Shield className="h-5 w-5 text-primary" />}
                            {record.type === "Consultation" && <User className="h-5 w-5 text-primary" />}
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">{record.description}</h3>
                            <p className="text-xs text-muted-foreground">{record.provider}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{record.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">ID: {record.id}</span>
                          </div>
                          <Badge status={record.status} className="text-xs px-2 py-0.5 rounded-full" />
                          <Button variant="outline" size="sm" className="glass-button border-none h-7">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-1">No records found</h3>
                    <p className="text-sm text-muted-foreground mb-4">No medical records match your search criteria.</p>
                    <Button
                      variant="outline"
                      className="glass-button border-none"
                      onClick={() => {
                        setSearchTerm("")
                        setRecordType("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card border-none">
              <CardHeader>
                <CardTitle>Upload New Record</CardTitle>
                <CardDescription>Add a new medical record to your blockchain storage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="record-type">Record Type</Label>
                    <Select>
                      <SelectTrigger id="record-type" className="glass-input">
                        <SelectValue placeholder="Select record type" />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="lab-report">Lab Report</SelectItem>
                        <SelectItem value="prescription">Prescription</SelectItem>
                        <SelectItem value="imaging">Imaging</SelectItem>
                        <SelectItem value="vaccination">Vaccination</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="record-date">Date</Label>
                    <Input id="record-date" type="date" className="glass-input" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="record-provider">Healthcare Provider</Label>
                    <Input id="record-provider" placeholder="Enter provider name" className="glass-input" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="record-description">Description</Label>
                    <Input id="record-description" placeholder="Enter description" className="glass-input" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="record-file">Upload File</Label>
                    <div className="border-2 border-dashed border-white/20 rounded-md p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-2">Drag and drop your file or click to browse</p>
                      <Button variant="outline" size="sm" className="glass-button border-none">
                        Browse Files
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Record
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none md:col-span-2">
              <CardHeader>
                <CardTitle>Blockchain Security</CardTitle>
                <CardDescription>Your medical records are secured with blockchain technology</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">VitalSync uses blockchain technology to ensure your medical records are:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="glass p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Immutable</h3>
                          <p className="text-xs text-muted-foreground">
                            Once recorded, your medical data cannot be altered or deleted, ensuring a tamper-proof
                            history.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="glass p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Encrypted</h3>
                          <p className="text-xs text-muted-foreground">
                            All records are encrypted with advanced algorithms to protect your sensitive health
                            information.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="glass p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Decentralized</h3>
                          <p className="text-xs text-muted-foreground">
                            Your records are stored across multiple nodes, eliminating single points of failure.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="glass p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Controlled Access</h3>
                          <p className="text-xs text-muted-foreground">
                            You control who can access your records with secure permission management.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-md mt-2">
                    <p className="text-xs text-muted-foreground">
                      VitalSync complies with all relevant healthcare data regulations including HIPAA and is certified
                      for medical data storage.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lab-reports" className="space-y-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle>Lab Reports</CardTitle>
              <CardDescription>View and manage your laboratory test results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalRecords
                  .filter((record) => record.type === "Lab Report")
                  .map((record) => (
                    <div key={record.id} className="glass p-4 rounded-lg">
                      <div className="flex flex-col sm:flex-row justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <Activity className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">{record.description}</h3>
                            <p className="text-xs text-muted-foreground">{record.provider}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{record.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">ID: {record.id}</span>
                          </div>
                          <Badge status={record.status} className="text-xs px-2 py-0.5 rounded-full" />
                          <Button variant="outline" size="sm" className="glass-button border-none h-7">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar content for other tabs */}
      </Tabs>
    </div>
  )
}

// Badge component for record status
function Badge({ status, className }: { status: string; className?: string }) {
  let bgColor = "bg-green-500/20 text-green-500"

  if (status === "Abnormal" || status === "Follow-up Required") {
    bgColor = "bg-amber-500/20 text-amber-500"
  } else if (status === "Critical") {
    bgColor = "bg-red-500/20 text-red-500"
  }

  return <span className={cn(bgColor, "rounded-full", className)}>{status}</span>
}

