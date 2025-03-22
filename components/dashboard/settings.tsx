"use client"

import { Slider } from "@/components/ui/slider"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Lock, Shield, Globe, Moon, Sun, Smartphone, Laptop } from "lucide-react"
import { useTranslation } from "@/components/language-selector"
import { useTheme } from "next-themes"
import { LanguageSelector } from "@/components/language-selector"
import { cn } from "@/lib/utils"

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile")
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("settings")}</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="glass border-none">
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <User className="h-4 w-4 mr-1" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <Bell className="h-4 w-4 mr-1" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Lock className="h-4 w-4 mr-1" /> Security
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-1">
            <Shield className="h-4 w-4 mr-1" /> Privacy
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-1">
            <Moon className="h-4 w-4 mr-1" /> Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="glass-button border-none">
                    Change Avatar
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="John" className="glass-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Doe" className="glass-input" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" className="glass-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+91 98765 43210" className="glass-input" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date-of-birth">Date of Birth</Label>
                      <Input id="date-of-birth" type="date" defaultValue="1985-06-15" className="glass-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select defaultValue="male">
                        <SelectTrigger id="gender" className="glass-input">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="glass">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Main Street, Mumbai" className="glass-input" />
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
              <CardDescription>Update your medical details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="blood-group">Blood Group</Label>
                    <Select defaultValue="o-positive">
                      <SelectTrigger id="blood-group" className="glass-input">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent className="glass">
                        <SelectItem value="a-positive">A+</SelectItem>
                        <SelectItem value="a-negative">A-</SelectItem>
                        <SelectItem value="b-positive">B+</SelectItem>
                        <SelectItem value="b-negative">B-</SelectItem>
                        <SelectItem value="ab-positive">AB+</SelectItem>
                        <SelectItem value="ab-negative">AB-</SelectItem>
                        <SelectItem value="o-positive">O+</SelectItem>
                        <SelectItem value="o-negative">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" type="number" defaultValue="175" className="glass-input" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" type="number" defaultValue="70" className="glass-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Input id="allergies" placeholder="Enter allergies if any" className="glass-input" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medical-conditions">Existing Medical Conditions</Label>
                  <textarea
                    id="medical-conditions"
                    className="w-full h-20 glass-input rounded-md p-2"
                    placeholder="Enter any existing medical conditions"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  <textarea
                    id="medications"
                    className="w-full h-20 glass-input rounded-md p-2"
                    placeholder="Enter any medications you are currently taking"
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90">Save Medical Information</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-appointments" className="flex-1">
                        Appointment Reminders
                      </Label>
                      <Switch id="email-appointments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-results" className="flex-1">
                        Test Results
                      </Label>
                      <Switch id="email-results" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-medication" className="flex-1">
                        Medication Reminders
                      </Label>
                      <Switch id="email-medication" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-updates" className="flex-1">
                        Platform Updates
                      </Label>
                      <Switch id="email-updates" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Push Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-appointments" className="flex-1">
                        Appointment Reminders
                      </Label>
                      <Switch id="push-appointments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-results" className="flex-1">
                        Test Results
                      </Label>
                      <Switch id="push-results" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-medication" className="flex-1">
                        Medication Reminders
                      </Label>
                      <Switch id="push-medication" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-updates" className="flex-1">
                        Platform Updates
                      </Label>
                      <Switch id="push-updates" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">SMS Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-appointments" className="flex-1">
                        Appointment Reminders
                      </Label>
                      <Switch id="sms-appointments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-results" className="flex-1">
                        Test Results
                      </Label>
                      <Switch id="sms-results" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-medication" className="flex-1">
                        Medication Reminders
                      </Label>
                      <Switch id="sms-medication" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-updates" className="flex-1">
                        Platform Updates
                      </Label>
                      <Switch id="sms-updates" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90">Save Notification Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Change Password</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" className="glass-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" className="glass-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" className="glass-input" />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">Update Password</Button>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Enable Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="enable-2fa" />
                    </div>
                    <Button variant="outline" className="glass-button border-none">
                      Set Up Two-Factor Authentication
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-medium">Login Sessions</h3>
                  <div className="space-y-3">
                    <div className="glass p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Laptop className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Chrome on Windows</p>
                            <p className="text-xs text-muted-foreground">Mumbai, India • Current Session</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="glass-button border-none">
                          Active
                        </Button>
                      </div>
                    </div>
                    <div className="glass p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Safari on iPhone</p>
                            <p className="text-xs text-muted-foreground">Mumbai, India • Last active: 2 hours ago</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="glass-button border-none">
                          Logout
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="glass-button border-none w-full">
                      Logout from All Devices
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Manage your data privacy and sharing preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Data Sharing</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Share Medical Data with Healthcare Providers</p>
                        <p className="text-xs text-muted-foreground">
                          Allow your doctors and hospitals to access your medical records
                        </p>
                      </div>
                      <Switch id="share-providers" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Share Medical Data with Insurance Providers</p>
                        <p className="text-xs text-muted-foreground">
                          Allow your insurance company to access your medical records
                        </p>
                      </div>
                      <Switch id="share-insurance" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Share Anonymized Data for Research</p>
                        <p className="text-xs text-muted-foreground">
                          Contribute to medical research with anonymized health data
                        </p>
                      </div>
                      <Switch id="share-research" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-medium">Profile Visibility</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Make Profile Visible to Healthcare Providers</p>
                        <p className="text-xs text-muted-foreground">
                          Allow healthcare providers to find you on VitalSync
                        </p>
                      </div>
                      <Switch id="visible-providers" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Make Profile Visible to Other Patients</p>
                        <p className="text-xs text-muted-foreground">Allow other patients to find you on VitalSync</p>
                      </div>
                      <Switch id="visible-patients" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-medium">Data Management</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="glass-button border-none">
                      Download My Data
                    </Button>
                    <Button variant="outline" className="glass-button border-none text-red-500">
                      Delete My Account
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Deleting your account will permanently remove all your data from VitalSync. This action cannot be
                    undone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how VitalSync looks and feels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className={cn(
                        "glass p-4 rounded-lg cursor-pointer transition-all",
                        theme === "light" && "ring-2 ring-primary",
                      )}
                      onClick={() => setTheme("light")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Sun className="h-8 w-8 text-amber-500" />
                        <span className="text-sm">Light</span>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "glass p-4 rounded-lg cursor-pointer transition-all",
                        theme === "dark" && "ring-2 ring-primary",
                      )}
                      onClick={() => setTheme("dark")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Moon className="h-8 w-8 text-indigo-400" />
                        <span className="text-sm">Dark</span>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "glass p-4 rounded-lg cursor-pointer transition-all",
                        theme === "system" && "ring-2 ring-primary",
                      )}
                      onClick={() => setTheme("system")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Laptop className="h-8 w-8 text-primary" />
                        <span className="text-sm">System</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-medium">Language</h3>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <LanguageSelector />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-medium">Accessibility</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Reduced Motion</p>
                        <p className="text-xs text-muted-foreground">Minimize animations throughout the interface</p>
                      </div>
                      <Switch id="reduced-motion" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">High Contrast</p>
                        <p className="text-xs text-muted-foreground">Increase contrast for better visibility</p>
                      </div>
                      <Switch id="high-contrast" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Text Size</p>
                        <span className="text-xs">100%</span>
                      </div>
                      <div className="pt-2">
                        <Slider defaultValue={[100]} min={75} max={150} step={5} className="w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-medium">Dashboard Layout</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Compact View</p>
                        <p className="text-xs text-muted-foreground">Show more information in less space</p>
                      </div>
                      <Switch id="compact-view" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Show Quick Actions</p>
                        <p className="text-xs text-muted-foreground">Display quick action buttons on dashboard</p>
                      </div>
                      <Switch id="quick-actions" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90">Save Appearance Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

