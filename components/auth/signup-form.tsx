"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Activity, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { secureStore } from "@/lib/encryption"

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!firstName || !lastName || !email || !password || !userType) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Store user data securely
      secureStore("user_session", {
        email,
        name: `${firstName} ${lastName}`,
        role: userType,
        token: "sample_jwt_token_" + Math.random().toString(36).substring(2),
        lastLogin: new Date().toISOString(),
      })

      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="glass-card p-8">
        <div className="flex flex-col space-y-2 text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold gradient-text">VitalSync</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your information to get started with VitalSync</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="John"
                className="glass-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Doe"
                className="glass-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="doctor@example.com"
              className="glass-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-type">I am a</Label>
            <Select value={userType} onValueChange={setUserType} required>
              <SelectTrigger id="user-type" className="glass-input">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent className="glass">
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="hospital">Hospital Administrator</SelectItem>
                <SelectItem value="insurance">Insurance Provider</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <div className="text-sm text-red-500 bg-red-500/10 p-2 rounded-md">{error}</div>}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-primary/90 transition-colors">
            Sign in
          </Link>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-muted-foreground">
          Developed by srreejith and k debugger
        </div>
      </div>
    </div>
  )
}

