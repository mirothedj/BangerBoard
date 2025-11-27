"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Eye, EyeOff, Loader2 } from "lucide-react"
import { login, signup } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function EnhancedLoginModal() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profileType: "fan" as "fan" | "host" | "artist",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const closeModal = () => {
    document.getElementById("enhanced-login-modal")?.classList.add("hidden")
    setError("")
    setFormData({ username: "", email: "", password: "", profileType: "fan" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password)
        if (result.success) {
          closeModal()
          router.refresh() // Refresh to update auth state
        } else {
          setError(result.error || "Login failed")
        }
      } else {
        const result = await signup(formData)
        if (result.success) {
          closeModal()
          router.refresh() // Refresh to update auth state
        } else {
          setError(result.error || "Signup failed")
        }
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("") // Clear error when user types
  }

  return (
    <div id="enhanced-login-modal" className="fixed inset-0 bg-smoke z-50 flex items-center justify-center hidden">
      <div className="bg-background rounded-lg w-full max-w-md p-6 relative border border-fire/20">
        <button onClick={closeModal} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-display text-fire">{isLogin ? "Welcome Back" : "Join BangerBoard"}</h2>
          <p className="text-muted-foreground mt-1">
            {isLogin ? "Sign in to your account" : "Create your account to get started"}
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-3 py-2 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              {isLogin && (
                <button type="button" className="text-xs text-primary hover:underline">
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="profileType">Profile Type</Label>
              <Select
                value={formData.profileType}
                onValueChange={(value: "fan" | "host" | "artist") => handleInputChange("profileType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your profile type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fan">Fan - Discover and rate shows</SelectItem>
                  <SelectItem value="host">Host - Create and manage shows</SelectItem>
                  <SelectItem value="artist">Artist - Get reviewed and connect</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button type="submit" className="w-full bg-fire hover:bg-fire/80" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isLogin ? "Signing in..." : "Creating account..."}
              </>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
                setFormData({ username: "", email: "", password: "", profileType: "fan" })
              }}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t text-center">
          <Button variant="outline" onClick={closeModal} className="w-full bg-transparent">
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  )
}
