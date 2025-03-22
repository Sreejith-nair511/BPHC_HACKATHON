"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Activity,
  BarChart4,
  Brain,
  FileText,
  Home,
  LineChart,
  Menu,
  MessageSquare,
  Pill,
  Settings,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useUser } from "@/contexts/user-context"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Patient Monitoring",
    href: "/dashboard/monitoring",
    icon: Activity,
  },
  {
    title: "Disease Prediction",
    href: "/dashboard/prediction",
    icon: Brain,
  },
  {
    title: "Medical Records",
    href: "/dashboard/records",
    icon: FileText,
  },
  {
    title: "Cost Comparison",
    href: "/dashboard/costs",
    icon: LineChart,
  },
  {
    title: "Medicine Verification",
    href: "/dashboard/medicines",
    icon: Pill,
  },
  {
    title: "Health Assistant",
    href: "/dashboard/assistant",
    icon: MessageSquare,
  },
  {
    title: "Patients",
    href: "/dashboard/patients",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart4,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-40 lg:hidden glass-button border-none"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs glass overflow-y-auto">
            <div className="flex h-14 items-center border-b border-white/10 px-4">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Activity className="h-6 w-6 text-primary" />
                <span className="gradient-text">VitalSync</span>
              </Link>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="py-4">
              <nav className="grid items-start px-2 text-sm font-medium">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                      pathname === item.href ? "glass text-foreground" : "hover:bg-white/5",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mt-auto p-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-sm">
                  <p className="font-medium">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.role || "Guest"}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full justify-start glass-button border-none" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <TooltipProvider>
        <div className="hidden border-r border-white/10 glass lg:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b border-white/10 px-4">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Activity className="h-6 w-6 text-primary" />
                <span className="gradient-text">VitalSync</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-2 text-sm font-medium">
                {navItems.map((item, index) => (
                  <Tooltip key={index} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                          pathname === item.href ? "glass text-foreground" : "hover:bg-white/5",
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-4">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </nav>
            </div>
            <div className="mt-auto p-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-sm">
                  <p className="font-medium">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.role || "Guest"}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full justify-start glass-button border-none" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </>
  )
}

