"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Eye, EyeOff } from "lucide-react"

// Sample affirmations for returning users
const AFFIRMATIONS = [
  "Music is the universal language that connects us all!",
  "Your taste in music is fire! Welcome back!",
  "Ready to discover your next favorite artist?",
  "The beat goes on! Great to see you again!",
  "Your musical journey continues here!",
]

export default function LoginModal() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [isExistingUser, setIsExistingUser] = useState(false)

  // Get random affirmation
  const affirmation = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]

  const closeModal = () => {
    document.getElementById("login-modal")?.classList.add("hidden")
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    // Simulate checking if user exists in database
    setIsExistingUser(e.target.value.length > 3)
  }

  return (
    <div id="login-modal" className="fixed inset-0 bg-smoke z-50 flex items-center justify-center hidden">
      <div className="bg-background rounded-lg w-full max-w-md p-6 relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-display text-fire">{isLogin ? "Welcome Back" : "Join BangerBoard"}</h2>
          <p className="text-muted-foreground mt-1">
            {isExistingUser && isLogin ? affirmation : "Rate and discover music review shows."}
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="username">Artist/User</Label>
            <Input id="username" placeholder="Enter your username" value={username} onChange={handleUsernameChange} />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <Button type="submit" className="w-full bg-fire hover:bg-fire/80">
            {isLogin ? "Login" : "Create Account"}
          </Button>

          <div className="text-center">
            <button type="button" className="text-sm text-primary hover:underline" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t text-center">
          <Button variant="outline" onClick={closeModal} className="w-full">
            Skip Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}
