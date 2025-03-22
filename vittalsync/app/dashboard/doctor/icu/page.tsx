"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Bed, Download, Filter, Hospital, MapPin, Phone, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for hospitals in India
const hospitals = [
  {
    id: 1,
    name: "AIIMS Delhi",
    location: "New Delhi",
    phone: "+91 11 2658 8500",
    totalICUBeds: 120,
    availableICUBeds: 15,
    totalVentilators: 80,
    availableVentilators: 8,
    distance: "2.5 km",
  },
  {
    id: 2,
    name: "Fortis Hospital",
    location: "Gurugram",
    phone: "+91 124 4921 021",
    totalICUBeds: 85,
    availableICUBeds: 3,
    totalVentilators: 50,
    availableVentilators: 2,
    distance: "8.7 km",
  },
  {
    id: 3,
    name: "Apollo Hospitals",
    location: "Bangalore",
    phone: "+91 80 4612 4444",
    totalICUBeds: 100,
    availableICUBeds: 22,
    totalVentilators: 65,
    availableVentilators: 14,
    distance: "12.3 km",
  },
  {
    id: 4,
    name: "Medanta - The Medicity",
    location: "Gurugram",
    phone: "+91 124 4141 414",
    totalICUBeds: 150,
    availableICUBeds: 0,
    totalVentilators: 90,
    availableVentilators: 0,
    distance: "15.8 km",
  },
  {
    id: 5,
    name: "Tata Memorial Hospital",
    location: "Mumbai",
    phone: "+91 22 2417 7000",
    totalICUBeds: 90,
    availableICUBeds: 12,
    totalVentilators: 60,
    availableVentilators: 7,
    distance: "22.1 km",
  },
  {
    id: 6,
    name: "Christian Medical College",
    location: "Vellore",
    phone: "+91 416 228 2010",
    totalICUBeds: 110,
    availableICUBeds: 18,
    totalVentilators: 75,
    availableVentilators: 11,
    distance: "35.4 km",
  },
]

export default function ICUTrackingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAvailability, setFilterAvailability] = useState("all")

  // Filter hospitals based on search term and availability filter
  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterAvailability === "available-icu") {
      return matchesSearch && hospital.availableICUBeds > 0
    } else if (filterAvailability === "available-ventilator") {
      return matchesSearch && hospital.availableVentilators > 0
    } else {
      return matchesSearch
    }
  })

  return (
    <DashboardLayout role="doctor">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">ICU & Ventilator Tracking</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Emergency Transfer
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search hospitals by name or location..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterAvailability} onValueChange={setFilterAvailability}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hospitals</SelectItem>
              <SelectItem value="available-icu">Available ICU Beds</SelectItem>
              <SelectItem value="available-ventilator">Available Ventilators</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="list" className="mt-6">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital) => (
              <Card key={hospital.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{hospital.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {hospital.location} ({hospital.distance})
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        Call
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-primary" />
                          <span className="font-medium">ICU Beds</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AvailabilityBadge available={hospital.availableICUBeds} total={hospital.totalICUBeds} />
                        </div>
                      </div>
                      <Progress
                        value={(hospital.availableICUBeds / hospital.totalICUBeds) * 100}
                        className="h-2"
                        indicatorClassName={getAvailabilityColor(hospital.availableICUBeds, hospital.totalICUBeds)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Hospital className="h-4 w-4 text-primary" />
                          <span className="font-medium">Ventilators</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AvailabilityBadge
                            available={hospital.availableVentilators}
                            total={hospital.totalVentilators}
                          />
                        </div>
                      </div>
                      <Progress
                        value={(hospital.availableVentilators / hospital.totalVentilators) * 100}
                        className="h-2"
                        indicatorClassName={getAvailabilityColor(
                          hospital.availableVentilators,
                          hospital.totalVentilators,
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-muted p-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No hospitals found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Interactive map would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Emergency Transfer Protocol</CardTitle>
            <CardDescription>Follow these steps when transferring a patient to an ICU</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Confirm ICU bed availability by calling the hospital directly</li>
              <li>Prepare patient documentation and medical history</li>
              <li>Arrange appropriate transportation (ambulance with required equipment)</li>
              <li>Notify receiving hospital of estimated arrival time</li>
              <li>Ensure continuous monitoring during transfer</li>
              <li>Update patient status in VittalSync system</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

function AvailabilityBadge({ available, total }: { available: number; total: number }) {
  const percentage = (available / total) * 100

  if (available === 0) {
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400">
        Full
      </Badge>
    )
  } else if (percentage <= 10) {
    return (
      <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
        {available} / {total} Limited
      </Badge>
    )
  } else {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
        {available} / {total} Available
      </Badge>
    )
  }
}

function getAvailabilityColor(available: number, total: number) {
  const percentage = (available / total) * 100

  if (available === 0) {
    return "bg-red-500"
  } else if (percentage <= 10) {
    return "bg-amber-500"
  } else {
    return "bg-green-500"
  }
}

