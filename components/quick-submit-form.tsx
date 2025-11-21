"use client"

import { Youtube, Instagram, Twitch } from "lucide-react"

export default function SocialMediaLinks() {
  return (
    <footer className="border border-border/50 bg-black/60 backdrop-blur-md mt-auto p-4 rounded-lg shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center items-center gap-6">
          {/* YouTube */}
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="relative group">
            <div className="absolute inset-0 bg-fire/40 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center w-12 h-12 bg-black/80 border border-fire/20 rounded-lg shadow-inner overflow-hidden transition-all duration-300 group-hover:border-fire/60 group-hover:shadow-[0_0_15px_rgba(255,107,0,0.5)]">
              <Youtube className="h-6 w-6 text-fire group-hover:animate-pulse-glow-slow" />
            </div>
          </a>

          {/* TikTok */}
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="relative group">
            <div className="absolute inset-0 bg-fire/40 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center w-12 h-12 bg-black/80 border border-fire/20 rounded-lg shadow-inner overflow-hidden transition-all duration-300 group-hover:border-fire/60 group-hover:shadow-[0_0_15px_rgba(255,107,0,0.5)]">
              <svg
                className="h-6 w-6 text-fire group-hover:animate-pulse-glow-slow"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </a>

          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="relative group">
            <div className="absolute inset-0 bg-fire/40 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center w-12 h-12 bg-black/80 border border-fire/20 rounded-lg shadow-inner overflow-hidden transition-all duration-300 group-hover:border-fire/60 group-hover:shadow-[0_0_15px_rgba(255,107,0,0.5)]">
              <Instagram className="h-6 w-6 text-fire group-hover:animate-pulse-glow-slow" />
            </div>
          </a>

          {/* Twitch */}
          <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="relative group">
            <div className="absolute inset-0 bg-fire/40 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center w-12 h-12 bg-black/80 border border-fire/20 rounded-lg shadow-inner overflow-hidden transition-all duration-300 group-hover:border-fire/60 group-hover:shadow-[0_0_15px_rgba(255,107,0,0.5)]">
              <Twitch className="h-6 w-6 text-fire group-hover:animate-pulse-glow-slow" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  )
}
