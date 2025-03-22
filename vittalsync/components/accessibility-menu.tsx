"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accessibility } from "lucide-react"
import { useState, useEffect } from "react"

export function AccessibilityMenu() {
  const [fontSize, setFontSize] = useState("normal")
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    // Apply font size changes
    document.documentElement.classList.remove("text-large", "text-xl-large")
    if (fontSize === "large") {
      document.documentElement.classList.add("text-large")
    } else if (fontSize === "xl-large") {
      document.documentElement.classList.add("text-xl-large")
    }

    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [fontSize, highContrast])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Accessibility className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Accessibility options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setFontSize("normal")}>Normal Font Size</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFontSize("large")}>Large Font Size</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFontSize("xl-large")}>Extra Large Font Size</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setHighContrast(!highContrast)}>
          {highContrast ? "Disable" : "Enable"} High Contrast
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

