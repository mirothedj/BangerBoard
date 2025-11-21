"use client"

import { createRootRoute, Outlet, Link } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { UserButton, SignInButton, useUser } from "@clerk/clerk-react"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { isSignedIn } = useUser()

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20">
      <nav className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/80 backdrop-blur-xl neo-subtle">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="text-2xl font-bold tracking-tighter neo-text">
            BangerBoard
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Discover
            </Link>
            <Link to="/playlists" className="text-sm font-medium hover:text-primary transition-colors">
              Playlists
            </Link>
            <div className="ml-4">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-sm font-medium rounded-lg neo-raised hover:neo-flat transition-all active:scale-95">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </div>
  )
}
