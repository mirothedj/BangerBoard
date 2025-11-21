"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Youtube, Twitch, Instagram } from "lucide-react"
import { FireRating } from "@/components/fire-rating"

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "youtube":
      return <Youtube className="h-3 w-3" />
    case "twitch":
      return <Twitch className="h-3 w-3" />
    case "instagram":
      return <Instagram className="h-3 w-3" />
    case "tiktok":
      return (
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"
            fill="currentColor"
          />
        </svg>
      )
    default:
      return null
  }
}

interface Show {
  id: number
  title: string
  description: string
  platform: string
  url: string
  thumbnail: string
  channelId?: string
  videoId?: string
  rating: number
  nextShow: string
  isLive: boolean
}

interface LiveShowsBarProps {
  shows: Show[]
}

export default function LiveShowsBar({ shows }: LiveShowsBarProps) {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const liveShows = shows.filter((show) => show.isLive)

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    updateScrollButtons()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", updateScrollButtons)
      return () => container.removeEventListener("scroll", updateScrollButtons)
    }
  }, [liveShows])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleCardClick = (show: Show) => {
    router.push(`/shows/${show.id}`)
  }

  if (liveShows.length === 0) return null

  return (
    <div className="w-full border-b border-border/30 bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-serif tracking-tight flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Live Now
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Scroll left"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Scroll right"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {liveShows.map((show) => (
            <Card
              key={show.id}
              className="flex-shrink-0 w-[280px] overflow-hidden cursor-pointer group live-show-card"
              onClick={() => handleCardClick(show)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden">
                  {show.videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${show.videoId}?rel=0&mute=1&autoplay=0`}
                      title={show.title}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-muted to-background flex items-center justify-center">
                      <div className="relative w-12 h-12">
                        <Image
                          src="/images/bangerboardimagelogo.png"
                          alt="BangerBoard Logo"
                          fill
                          className="object-contain opacity-50"
                        />
                      </div>
                    </div>
                  )}

                  <Badge className="absolute top-2 right-2 bg-red-500 text-white border-0 live-pulse text-xs">
                    <span className="relative flex h-2 w-2 mr-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    LIVE
                  </Badge>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-3 bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <PlatformIcon platform={show.platform} />
                    <h4 className="font-medium text-sm truncate flex-1">{show.title}</h4>
                    <FireRating rating={show.rating} size="sm" />
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{show.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .live-show-card {
          animation: gentle-glow 2s ease-in-out infinite alternate;
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
        }
        .live-show-card:hover {
          box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
        }
        @keyframes gentle-glow {
          from {
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
          }
          to {
            box-shadow: 0 0 25px rgba(239, 68, 68, 0.5);
          }
        }
      `}</style>
    </div>
  )
}
