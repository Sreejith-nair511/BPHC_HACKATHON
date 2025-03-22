"use client"

import * as React from "react"
import Link from "next/link"
import { Activity, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSelector, useTranslation } from "@/components/language-selector"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const { t } = useTranslation()

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all duration-300">
              <Activity className="h-6 w-6 text-primary animate-pulse-glow" />
            </div>
            <span className="text-xl font-bold gradient-text">VitalSync</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            {t("features")}
          </Link>
          <Link href="#stats" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            {t("stats")}
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            {t("testimonials")}
          </Link>
          <Link href="#contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            {t("contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ModeToggle />
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" asChild className="glass-button border-none">
              <Link href="/login">{t("login")}</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 transition-colors">
              <Link href="/signup">{t("signup")}</Link>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden py-4 pb-6 animate-fade-in">
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("features")}
            </Link>
            <Link
              href="#stats"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("stats")}
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("testimonials")}
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("contact")}
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" asChild className="w-full glass-button border-none">
                <Link href="/login">{t("login")}</Link>
              </Button>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 transition-colors">
                <Link href="/signup">{t("signup")}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

