"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Activity,
  Bell,
  Calendar,
  HeartPulse,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  BarChart,
  Bed,
  AlertTriangle,
  Search,
  FileText,
  Smartphone,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LanguageSelector } from "@/components/language-selector"
import { AccessibilityMenu } from "@/components/accessibility-menu"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "patient" | "doctor" | "admin"
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [notifications, setNotifications] = useState(3)

  const roleConfig = {
    patient: {
      name: "Rajesh Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      navItems: [
        { href: "/dashboard/patient", label: "Dashboard", icon: Home },
        { href: "/dashboard/patient/vitals", label: "My Vitals", icon: Activity },
        { href: "/dashboard/patient/wearable", label: "Kadambini Device", icon: Smartphone },
        { href: "/dashboard/patient/records", label: "Medical Records", icon: FileText },
        { href: "/dashboard/patient/appointments", label: "Appointments", icon: Calendar },
        { href: "/dashboard/patient/chat", label: "Chat Assistant", icon: MessageSquare },
        { href: "/dashboard/patient/settings", label: "Settings", icon: Settings },
      ],
    },
    doctor: {
      name: "Dr. Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      navItems: [
        { href: "/dashboard/doctor", label: "Dashboard", icon: Home },
        { href: "/dashboard/doctor/patients", label: "My Patients", icon: Users },
        { href: "/dashboard/doctor/monitoring", label: "Monitoring", icon: Activity },
        { href: "/dashboard/doctor/icu", label: "ICU Tracking", icon: Bed },
        { href: "/dashboard/doctor/appointments", label: "Appointments", icon: Calendar },
        { href: "/dashboard/doctor/chat", label: "Consultations", icon: MessageSquare },
        { href: "/dashboard/doctor/settings", label: "Settings", icon: Settings },
      ],
    },
    admin: {
      name: "Ananya Deshmukh",
      avatar: "/placeholder.svg?height=40&width=40",
      navItems: [
        { href: "/dashboard/admin", label: "Dashboard", icon: Home },
        { href: "/dashboard/admin/analytics", label: "Analytics", icon: BarChart },
        { href: "/dashboard/admin/resources", label: "Resources", icon: Bed },
        { href: "/dashboard/admin/staff", label: "Staff", icon: Users },
        { href: "/dashboard/admin/emergency", label: "Emergency", icon: AlertTriangle },
        { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
      ],
    },
  }

  const config = roleConfig[role]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="font-bold">VittalSync</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <form className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-64 rounded-lg bg-background pl-8 md:w-80" />
              </div>
            </form>
            <LanguageSelector />
            <AccessibilityMenu />
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">{notifications}</Badge>
              )}
            </Button>
            <ThemeToggle />
            <Avatar>
              <AvatarImage src={config.avatar} alt={config.name} />
              <AvatarFallback>{config.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 px-2 py-2">
                <Avatar>
                  <AvatarImage src={config.avatar} alt={config.name} />
                  <AvatarFallback>{config.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <div className="font-medium">{config.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{role}</div>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {config.navItems.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={pathname === item.href}>
                          <Link href={item.href}>
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild onClick={() => router.push("/")}>
                    <button>
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}

