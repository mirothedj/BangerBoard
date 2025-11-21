"use client"

import { Link } from "@tanstack/react-router"
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react"
import { Music, Search, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme"

export function Header() {
  const { isSignedIn } = useUser()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full bg-background neo-subtle border-b border-border/30 transition-colors duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="neo-raised rounded-2xl p-3 bg-background transition-transform group-hover:scale-105">
              <Music className="h-7 w-7 text-primary" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BangerBoard
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:text-primary neo-flat hover:neo-inset"
              activeProps={{
                className: "text-primary neo-inset bg-background/50",
              }}
            >
              Home
            </Link>
            <Link
              to="/playlists"
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:text-primary neo-flat hover:neo-inset"
              activeProps={{
                className: "text-primary neo-inset bg-background/50",
              }}
            >
              Playlists
            </Link>
            <Link
              to="/hosts"
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:text-primary neo-flat hover:neo-inset"
              activeProps={{
                className: "text-primary neo-inset bg-background/50",
              }}
            >
              Hosts
            </Link>
            <Link
              to="/creators"
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:text-primary neo-flat hover:neo-inset"
              activeProps={{
                className: "text-primary neo-inset bg-background/50",
              }}
            >
              Creators
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="neo-raised rounded-xl p-3 bg-background hover:neo-inset transition-all text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-primary" />}
          </button>
          <button className="neo-raised rounded-xl p-3 bg-background hover:neo-inset transition-all text-foreground">
            <Search className="h-5 w-5" />
          </button>
          <div className="neo-raised rounded-xl bg-background overflow-hidden">
            {isSignedIn ? (
              <div className="p-1">
                <UserButton />
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button className="neo-flat rounded-xl border-0 bg-primary/10 hover:bg-primary/20 text-primary font-semibold">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
