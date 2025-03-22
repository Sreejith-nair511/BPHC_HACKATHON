import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SplashScreen } from "@/components/splash-screen"
import { AiChat } from "@/components/ai-chat"
import { UserProvider } from "@/contexts/user-context"
import { DynamicBackground } from "@/components/dynamic-background"
import { LanguageProvider } from "@/components/language-selector"
import { AccessibilityControls } from "@/components/accessibility-controls"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VitalSync - AI-Powered Healthcare Platform for India",
  description:
    "Revolutionary healthcare platform with AI analytics and blockchain security, tailored for Indian healthcare",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <UserProvider>
              <DynamicBackground>
                <SplashScreen />
                <AccessibilityControls />
                {children}
                <AiChat />
              </DynamicBackground>
            </UserProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'