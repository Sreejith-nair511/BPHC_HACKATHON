"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Ambulance, Hospital, Phone } from "lucide-react"

export default function EmergencyPage() {
  const [location, setLocation] = useState("")

  const emergencyContacts = [
    { name: "National Emergency Number", number: "112", icon: <Phone className="h-5 w-5" /> },
    { name: "Ambulance Services", number: "108", icon: <Ambulance className="h-5 w-5" /> },
    { name: "Health Helpline", number: "104", icon: <Hospital className="h-5 w-5" /> },
    { name: "Women Helpline", number: "1091", icon: <Phone className="h-5 w-5" /> },
    { name: "Child Helpline", number: "1098", icon: <Phone className="h-5 w-5" /> },
    { name: "Mental Health Helpline", number: "1800-599-0019", icon: <Phone className="h-5 w-5" /> },
  ]

  const nearbyHospitals = [
    {
      name: "AIIMS Delhi",
      address: "Sri Aurobindo Marg, Ansari Nagar, New Delhi, Delhi 110029",
      phone: "011-2658 8500",
      type: "Government",
    },
    {
      name: "Fortis Hospital",
      address: "Sector B, Pocket 1, Aruna Asaf Ali Marg, Vasant Kunj, New Delhi, Delhi 110070",
      phone: "011-4277 6222",
      type: "Private",
    },
    {
      name: "Apollo Hospitals",
      address: "Sarita Vihar, Delhi Mathura Road, New Delhi, Delhi 110076",
      phone: "011-7179 1090",
      type: "Private",
    },
    {
      name: "Safdarjung Hospital",
      address: "Ansari Nagar West, New Delhi, Delhi 110029",
      phone: "011-2673 0000",
      type: "Government",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Emergency Assistance</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
            <CardHeader>
              <CardTitle className="text-red-800 dark:text-red-200">Emergency Contacts</CardTitle>
              <CardDescription className="text-red-700 dark:text-red-300">
                Important numbers for medical emergencies in India
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {emergencyContacts.map((contact) => (
                  <div key={contact.name} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-red-100 p-2 text-red-800 dark:bg-red-900 dark:text-red-200">
                        {contact.icon}
                      </div>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="border-red-200 bg-white text-red-800 hover:bg-red-100 hover:text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-200 dark:hover:bg-red-900"
                      asChild
                    >
                      <a href={`tel:${contact.number}`}>{contact.number}</a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Find Nearby Hospitals</CardTitle>
              <CardDescription>Enter your location to find hospitals near you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-6">
                <Input
                  placeholder="Enter your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <Button>Search</Button>
              </div>

              <div className="grid gap-4">
                {nearbyHospitals.map((hospital) => (
                  <div key={hospital.name} className="rounded-lg border p-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{hospital.name}</h3>
                      <span
                        className={`text-xs ${hospital.type === "Government" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"} rounded-full px-2 py-1`}
                      >
                        {hospital.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{hospital.address}</p>
                    <div className="flex justify-between items-center mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`tel:${hospital.phone}`}>{hospital.phone}</a>
                      </Button>
                      <Button size="sm">Get Directions</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

