"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Download, Eye, FileText, Filter, Pill, Search, Share2, Stethoscope, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample medical records data
const medicalReports = [
  {
    id: 1,
    title: "Complete Blood Count (CBC)",
    doctor: "Dr. Priya Patel",
    hospital: "AIIMS Delhi",
    date: "15 Mar 2025",
    type: "Lab Report",
    status: "normal",
  },
  {
    id: 2,
    title: "Chest X-Ray",
    doctor: "Dr. Vikram Singh",
    hospital: "Apollo Hospitals",
    date: "28 Feb 2025",
    type: "Radiology",
    status: "normal",
  },
  {
    id: 3,
    title: "Lipid Profile",
    doctor: "Dr. Priya Patel",
    hospital: "AIIMS Delhi",
    date: "15 Feb 2025",
    type: "Lab Report",
    status: "abnormal",
  },
  {
    id: 4,
    title: "Echocardiogram",
    doctor: "Dr. Anand Rao",
    hospital: "Fortis Hospital",
    date: "05 Jan 2025",
    type: "Cardiology",
    status: "normal",
  },
  {
    id: 5,
    title: "Thyroid Function Test",
    doctor: "Dr. Meera Joshi",
    hospital: "Max Healthcare",
    date: "20 Dec 2024",
    type: "Lab Report",
    status: "abnormal",
  },
]

// Sample prescriptions data
const prescriptions = [
  {
    id: 1,
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    doctor: "Dr. Priya Patel",
    startDate: "15 Mar 2025",
    endDate: "15 Jun 2025",
    status: "active",
  },
  {
    id: 2,
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    doctor: "Dr. Vikram Singh",
    startDate: "28 Feb 2025",
    endDate: "28 May 2025",
    status: "active",
  },
  {
    id: 3,
    medication: "Amlodipine",
    dosage: "5mg",
    frequency: "Once daily",
    doctor: "Dr. Anand Rao",
    startDate: "05 Jan 2025",
    endDate: "05 Apr 2025",
    status: "active",
  },
  {
    id: 4,
    medication: "Azithromycin",
    dosage: "500mg",
    frequency: "Once daily",
    doctor: "Dr. Meera Joshi",
    startDate: "20 Dec 2024",
    endDate: "27 Dec 2024",
    status: "completed",
  },
]

// Sample allergies and conditions
const allergies = ["Penicillin", "Peanuts", "Dust Mites"]
const conditions = [
  { name: "Type 2 Diabetes", since: "2020", status: "Managed" },
  { name: "Hypertension", since: "2018", status: "Managed" },
  { name: "Hyperlipidemia", since: "2020", status: "Managed" },
]

// Sample surgeries and procedures
const surgeries = [
  {
    id: 1,
    procedure: "Appendectomy",
    doctor: "Dr. Rajiv Kumar",
    hospital: "AIIMS Delhi",
    date: "12 Jun 2015",
    notes: "Laparoscopic procedure, no complications",
  },
  {
    id: 2,
    procedure: "Knee Arthroscopy",
    doctor: "Dr. Sanjay Gupta",
    hospital: "Fortis Hospital",
    date: "23 Aug 2019",
    notes: "Right knee, meniscus repair",
  },
]

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Filter medical reports based on search term and type filter
  const filteredReports = medicalReports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.hospital.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterType === "all") {
      return matchesSearch
    } else {
      return matchesSearch && report.type.toLowerCase() === filterType.toLowerCase()
    }
  })

  return (
    <DashboardLayout role="patient">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Medical Records</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload Record
          </Button>
          <Button size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share with Doctor
          </Button>
        </div>
      </div>

      <Tabs defaultValue="reports" className="mt-6">
        <TabsList>
          <TabsTrigger value="reports">Medical Reports</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="conditions">Conditions & Allergies</TabsTrigger>
          <TabsTrigger value="surgeries">Surgeries & Procedures</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports by title, doctor, or hospital..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Lab Report">Lab Reports</SelectItem>
                  <SelectItem value="Radiology">Radiology</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Medical Reports</CardTitle>
              <CardDescription>View and download your medical reports</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredReports.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <div>
                              <p className="font-medium">{report.title}</p>
                              <p className="text-xs text-muted-foreground">{report.hospital}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{report.doctor}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <StatusBadge status={report.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="rounded-full bg-muted p-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No reports found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>Your active prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Prescribed By</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">{prescription.medication}</p>
                            <p className="text-xs text-muted-foreground">{prescription.frequency}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{prescription.dosage}</TableCell>
                      <TableCell>{prescription.doctor}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-xs">From: {prescription.startDate}</p>
                          <p className="text-xs">To: {prescription.endDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <PrescriptionStatusBadge status={prescription.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medication Schedule</CardTitle>
              <CardDescription>Your daily medication schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Morning (Before Breakfast)</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Pill className="h-4 w-4 text-primary" />
                      <span>Metformin 500mg</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Morning (After Breakfast)</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Pill className="h-4 w-4 text-primary" />
                      <span>Amlodipine 5mg</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Evening (After Dinner)</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Pill className="h-4 w-4 text-primary" />
                      <span>Atorvastatin 20mg</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Pill className="h-4 w-4 text-primary" />
                      <span>Metformin 500mg</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conditions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Chronic Conditions</CardTitle>
                <CardDescription>Your ongoing health conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Condition</TableHead>
                      <TableHead>Since</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {conditions.map((condition, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Stethoscope className="h-4 w-4 text-primary" />
                            <span className="font-medium">{condition.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{condition.since}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                          >
                            {condition.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Allergies</CardTitle>
                <CardDescription>Known allergies and sensitivities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allergies.map((allergy, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-lg border p-3">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">{allergy}</span>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Allergy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Family Medical History</CardTitle>
              <CardDescription>Relevant medical conditions in your family</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Condition</TableHead>
                    <TableHead>Relation</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-primary" />
                        <span className="font-medium">Type 2 Diabetes</span>
                      </div>
                    </TableCell>
                    <TableCell>Father</TableCell>
                    <TableCell>Diagnosed at age 45</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-primary" />
                        <span className="font-medium">Hypertension</span>
                      </div>
                    </TableCell>
                    <TableCell>Mother</TableCell>
                    <TableCell>Diagnosed at age 50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-primary" />
                        <span className="font-medium">Coronary Artery Disease</span>
                      </div>
                    </TableCell>
                    <TableCell>Paternal Grandfather</TableCell>
                    <TableCell>Passed away at age 68</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="surgeries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Surgeries & Procedures</CardTitle>
              <CardDescription>Your surgical history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Procedure</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {surgeries.map((surgery) => (
                    <TableRow key={surgery.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-primary" />
                          <span className="font-medium">{surgery.procedure}</span>
                        </div>
                      </TableCell>
                      <TableCell>{surgery.doctor}</TableCell>
                      <TableCell>{surgery.hospital}</TableCell>
                      <TableCell>{surgery.date}</TableCell>
                      <TableCell>{surgery.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Immunizations</CardTitle>
              <CardDescription>Your vaccination history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vaccine</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Next Due</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Syringe className="h-4 w-4 text-primary" />
                        <span className="font-medium">Tetanus-Diphtheria (Td)</span>
                      </div>
                    </TableCell>
                    <TableCell>12 Jun 2020</TableCell>
                    <TableCell>12 Jun 2030</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Syringe className="h-4 w-4 text-primary" />
                        <span className="font-medium">Influenza (Flu)</span>
                      </div>
                    </TableCell>
                    <TableCell>15 Oct 2024</TableCell>
                    <TableCell>15 Oct 2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Syringe className="h-4 w-4 text-primary" />
                        <span className="font-medium">COVID-19</span>
                      </div>
                    </TableCell>
                    <TableCell>20 Jan 2024</TableCell>
                    <TableCell>20 Jan 2025</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "normal") {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
        Normal
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
      Abnormal
    </Badge>
  )
}

function PrescriptionStatusBadge({ status }: { status: string }) {
  if (status === "active") {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
        Active
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-muted">
      Completed
    </Badge>
  )
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function Syringe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m14.5 4-2-2-7 8 7 8 2-2" />
      <path d="m5.5 8.5 3 3" />
      <path d="m16.5 4.5 5 5-2 2-3-3-2 2-5-5 2-2 3 3 2-2Z" />
      <path d="m18.5 11.5-3-3" />
    </svg>
  )
}

