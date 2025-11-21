"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserCircle, Home } from "lucide-react"

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY

      // Determine if scrolling up or down
      if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header
        setIsVisible(false)
      } else {
        // Scrolling up - show header
        setIsVisible(true)
      }

      // Update last scroll position
      setLastScrollY(currentScrollY)
    }

    // Add scroll event listener
    window.addEventListener("scroll", controlHeader)

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", controlHeader)
    }
  }, [lastScrollY])

  return (
    <header
      className={`border-b bg-background/80 backdrop-blur-md sticky top-0 z-10 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 py-3">
        {/* BANGERBOARD heading on left, form and login on right */}
        <div className="flex justify-between items-center">
          <h1 className="font-banger text-3xl md:text-5xl text-fire animate-pulse-glow-slow">BANGERBOARD</h1>

          <div className="flex-1 flex justify-center items-center">
            {/* Form moved to the center */}
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                const input = e.currentTarget.elements.namedItem("showUrl") as HTMLInputElement
                if (input.value) {
                  // Set submitting state
                  setIsSubmitting(true)

                  // Simulate submission (replace with actual API call)
                  setTimeout(() => {
                    setIsSubmitting(false)
                    setIsSuccess(true)
                    input.value = ""

                    // Reset success state after 2 seconds
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
                placeholder="Add show to BangerBoard.com"
                className="w-52 md:w-58 h-7 px-2 text-xs rounded-md border-2 border-[#FF5F00] outline-none focus:ring-2 focus:ring-[#FF5F00]/50 bg-background"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center h-8 w-8 rounded-full transition-colors duration-300 ${
                  isSuccess ? "bg-green-500 text-white" : "bg-fire text-white hover:bg-fire/80"
                }`}
              >
                {isSubmitting ? (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
            </form>

            {/* Login button */}
            {isLoggedIn ? (
              <Link href="/">
                <Button variant="ghost" className="text-sm md:text-base">
                  <Home className="mr-2 h-5 w-5" />
                  Home
                </Button>
              </Link>
            ) : (
              <Button
                variant="ghost"
                className="text-sm md:text-base ml-4"
                onClick={() => {
                  // Open login modal
                  document.getElementById("login-modal")?.classList.remove("hidden")
                  // For demo purposes, set logged in to true when clicking login
                  // In a real app, this would happen after successful authentication
                  setIsLoggedIn(true)
                }}
              >
                <UserCircle className="mr-2 h-5 w-5" />
                Login/Signup
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
