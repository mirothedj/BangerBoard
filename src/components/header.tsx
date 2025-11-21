"use client"

import { Link } from "@tanstack/react-router"
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react"
import { Music, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const { isSignedIn } = useUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Music className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BangerBoard</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Home
            </Link>
            <Link
              to="/playlists"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Playlists
            </Link>
            <Link
              to="/hosts"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Hosts
            </Link>
            <Link
              to="/creators"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Creators
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  )
}
