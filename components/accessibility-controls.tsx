"use client"

import { useState, useEffect } from "react"
import { Accessibility, ChevronDown, ChevronUp, Eye, Type, ZoomIn, ZoomOut, MousePointer2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/components/language-selector"

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [contrast, setContrast] = useState<"normal" | "high">("normal")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [largePointer, setLargePointer] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [keyboardFocus, setKeyboardFocus] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    // Load saved preferences
    const savedFontSize = localStorage.getItem("accessibility-font-size")
    const savedContrast = localStorage.getItem("accessibility-contrast")
    const savedReducedMotion = localStorage.getItem("accessibility-reduced-motion")
    const savedLargePointer = localStorage.getItem("accessibility-large-pointer")
    const savedScreenReader = localStorage.getItem("accessibility-screen-reader")
    const savedKeyboardFocus = localStorage.getItem("accessibility-keyboard-focus")

    if (savedFontSize) setFontSize(Number.parseInt(savedFontSize))
    if (savedContrast) setContrast(savedContrast as "normal" | "high")
    if (savedReducedMotion) setReducedMotion(savedReducedMotion === "true")
    if (savedLargePointer) setLargePointer(savedLargePointer === "true")
    if (savedScreenReader) setScreenReader(savedScreenReader === "true")
    if (savedKeyboardFocus) setKeyboardFocus(savedKeyboardFocus === "true")

    applySettings()
  }, [])

  const applySettings = () => {
    // Apply font size to document root
    document.documentElement.style.fontSize = `${fontSize}%`

    // Apply contrast class
    if (contrast === "high") {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    // Apply reduced motion
    if (reducedMotion) {
      document.documentElement.classList.add("reduced-motion")
    } else {
      document.documentElement.classList.remove("reduced-motion")
    }

    // Apply large pointer
    if (largePointer) {
      document.documentElement.classList.add("large-pointer")
    } else {
      document.documentElement.classList.remove("large-pointer")
    }

    // Apply screen reader optimizations
    if (screenReader) {
      document.documentElement.classList.add("screen-reader-optimized")
    } else {
      document.documentElement.classList.remove("screen-reader-optimized")
    }

    // Apply keyboard focus
    if (keyboardFocus) {
      document.documentElement.classList.add("keyboard-focus")
    } else {
      document.documentElement.classList.remove("keyboard-focus")
    }
  }

  const saveSetting = (key: string, value: string | number | boolean) => {
    localStorage.setItem(`accessibility-${key}`, value.toString())
  }

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0])
    saveSetting("font-size", value[0])
    applySettings()
  }

  const toggleContrast = () => {
    const newContrast = contrast === "normal" ? "high" : "normal"
    setContrast(newContrast)
    saveSetting("contrast", newContrast)
    applySettings()
  }

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion
    setReducedMotion(newValue)
    saveSetting("reduced-motion", newValue)
    applySettings()
  }

  const toggleLargePointer = () => {
    const newValue = !largePointer
    setLargePointer(newValue)
    saveSetting("large-pointer", newValue)
    applySettings()
  }

  const toggleScreenReader = () => {
    const newValue = !screenReader
    setScreenReader(newValue)
    saveSetting("screen-reader", newValue)
    applySettings()
  }

  const toggleKeyboardFocus = () => {
    const newValue = !keyboardFocus
    setKeyboardFocus(newValue)
    saveSetting("keyboard-focus", newValue)
    applySettings()
  }

  useEffect(() => {
    applySettings()
  }, [fontSize, contrast, reducedMotion, largePointer, screenReader, keyboardFocus])

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="glass-button border-none rounded-full px-4"
            aria-label={t("accessibility_settings")}
          >
            <Accessibility className="h-4 w-4 mr-2" />
            <span className="sr-only md:not-sr-only md:inline-block">{t("accessibility_settings")}</span>
            {isOpen ? <ChevronDown className="h-4 w-4 ml-1" /> : <ChevronUp className="h-4 w-4 ml-1" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="glass w-80">
          <DropdownMenuLabel>{t("accessibility_settings")}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <div className="p-4 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Type className="h-4 w-4 mr-2" />
                  <span className="text-sm">{t("text_size")}</span>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleFontSizeChange([Math.max(75, fontSize - 10)])}
                    aria-label="Decrease text size"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-xs w-10 text-center">{fontSize}%</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleFontSizeChange([Math.min(150, fontSize + 10)])}
                    aria-label="Increase text size"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Slider
                value={[fontSize]}
                min={75}
                max={150}
                step={5}
                onValueChange={handleFontSizeChange}
                className="w-full"
                aria-label="Adjust text size"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  <Label htmlFor="high-contrast" className="text-sm">
                    {t("high_contrast")}
                  </Label>
                </div>
                <Switch
                  id="high-contrast"
                  checked={contrast === "high"}
                  onCheckedChange={toggleContrast}
                  aria-label="Toggle high contrast mode"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="h-4 w-4 mr-2">🚶</span>
                  <Label htmlFor="reduced-motion" className="text-sm">
                    {t("reduced_motion")}
                  </Label>
                </div>
                <Switch
                  id="reduced-motion"
                  checked={reducedMotion}
                  onCheckedChange={toggleReducedMotion}
                  aria-label="Toggle reduced motion"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MousePointer2 className="h-4 w-4 mr-2" />
                  <Label htmlFor="large-pointer" className="text-sm">
                    Large Pointer
                  </Label>
                </div>
                <Switch
                  id="large-pointer"
                  checked={largePointer}
                  onCheckedChange={toggleLargePointer}
                  aria-label="Toggle large pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="h-4 w-4 mr-2">🔊</span>
                  <Label htmlFor="screen-reader" className="text-sm">
                    Screen Reader Optimization
                  </Label>
                </div>
                <Switch
                  id="screen-reader"
                  checked={screenReader}
                  onCheckedChange={toggleScreenReader}
                  aria-label="Toggle screen reader optimization"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="h-4 w-4 mr-2">⌨️</span>
                  <Label htmlFor="keyboard-focus" className="text-sm">
                    Enhanced Keyboard Focus
                  </Label>
                </div>
                <Switch
                  id="keyboard-focus"
                  checked={keyboardFocus}
                  onCheckedChange={toggleKeyboardFocus}
                  aria-label="Toggle enhanced keyboard focus"
                />
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => {
                setFontSize(100)
                setContrast("normal")
                setReducedMotion(false)
                setLargePointer(false)
                setScreenReader(false)
                setKeyboardFocus(false)

                // Save all reset settings
                saveSetting("font-size", 100)
                saveSetting("contrast", "normal")
                saveSetting("reduced-motion", false)
                saveSetting("large-pointer", false)
                saveSetting("screen-reader", false)
                saveSetting("keyboard-focus", false)

                applySettings()
              }}
              aria-label="Reset accessibility settings to default"
            >
              Reset to Default
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

