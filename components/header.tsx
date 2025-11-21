"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserCircle, Settings, LogOut, Plus, Music, Users, Briefcase } from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth"
import type { User } from "@/lib/auth"

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    loadUser()
  }, [])

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", controlHeader)
    return () => {
      window.removeEventListener("scroll", controlHeader)
    }
  }, [lastScrollY])

  const handleLogout = async () => {
    await logout()
    setUser(null)
  }

  return (
    <header
      className={`border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex justify-between items-center gap-4">
          <Link href="/" className="flex-shrink-0">
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight hover:text-accent transition-colors cursor-pointer">
              BangerBoard
            </h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/playlists"
              className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-2"
            >
              <Music className="h-4 w-4" />
              Playlists
            </Link>
            <Link
              href="/hosts"
              className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Hosts
            </Link>
            <Link
              href="/creators"
              className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-2"
            >
              <Briefcase className="h-4 w-4" />
              Creators
            </Link>
          </nav>
          {/* </CHANGE> */}

          <div className="flex-1 flex justify-center items-center max-w-md mx-auto lg:max-w-xs">
            <form
              className="flex items-center gap-2 w-full"
              onSubmit={(e) => {
                e.preventDefault()
                const input = e.currentTarget.elements.namedItem("showUrl") as HTMLInputElement
                if (input.value) {
                  setIsSubmitting(true)
                  setTimeout(() => {
                    setIsSubmitting(false)
                    setIsSuccess(true)
                    input.value = ""
                    setTimeout(() => {
                      setIsSuccess(false)
                    }, 2000)
                  }, 1000)
                }
              }}
            >
              <input
                type="url"
                name="showUrl"
                placeholder="Add show URL..."
                className="flex-1 h-10 px-4 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                size="icon"
                className={`h-10 w-10 rounded-lg transition-all ${
                  isSuccess ? "bg-green-500 hover:bg-green-600" : "bg-accent hover:bg-accent/90"
                }`}
              >
                {isSubmitting ? (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isSuccess ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {user ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <UserCircle className="h-4 w-4" />
                    <span className="hidden md:inline">{user.username}</span>
                  </Button>
                </Link>
                {user.profileType === "host" && user.isApproved && (
                  <Link href="/admin">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                onClick={() => {
                  document.getElementById("enhanced-login-modal")?.classList.remove("hidden")
                }}
              >
                <UserCircle className="h-4 w-4" />
                <span className="hidden md:inline">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
