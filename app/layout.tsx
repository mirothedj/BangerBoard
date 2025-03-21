import type React from "react"
import type { Metadata } from "next"
import { Inter, Permanent_Marker, Rubik_Mono_One, Bangers } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { EzoicWrapper } from "./components/ezoic-wrapper"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-permanent-marker",
})

const rubikMonoOne = Rubik_Mono_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rubik-mono-one",
})

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
})

export const metadata: Metadata = {
  title: "BangerBoard - Music Review Directory",
  description: "Find and rate the best music review shows across YouTube, Twitch, Instagram, and TikTok",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${permanentMarker.variable} ${rubikMonoOne.variable} ${bangers.variable} font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <EzoicWrapper>
            {/* Grid pattern background for entire site */}
            <div
              className="fixed inset-0 pointer-events-none opacity-5 dark:opacity-10 z-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
          </EzoicWrapper>
          
          <div className="bg-noise" />
        </ThemeProvider>
      </body>
    </html>
  )
}

import "./globals.css"



import './globals.css'