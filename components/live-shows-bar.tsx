"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Youtube, Twitch, Instagram, ChevronLeft, ChevronRight } from "lucide-react"
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
  const [scrollDirection, setScrollDirection] = useState<"left" | "right">("right")
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const animationRef = useRef<number>()
  const [scrollPosition, setScrollPosition] = useState(0)

  const liveShows = shows.filter((show) => show.isLive)
  const doubledShows = [...liveShows, ...liveShows] // Double for seamless loop

  useEffect(() => {
    if (!isAutoScrolling) return

    const container = scrollContainerRef.current
    if (!container) return

    const scroll = () => {
      setScrollPosition((prev) => {
        const maxScroll = container.scrollWidth / 2 // Half because we doubled content
        const speed = 0.5

        if (scrollDirection === "right") {
          const newPosition = prev + speed
          return newPosition >= maxScroll ? 0 : newPosition
        } else {
          const newPosition = prev - speed
          return newPosition <= 0 ? maxScroll : newPosition
        }
      })
      animationRef.current = requestAnimationFrame(scroll)
    }

    animationRef.current = requestAnimationFrame(scroll)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAutoScrolling, scrollDirection])

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollPosition
    }
  }, [scrollPosition])

  const handleDirectionChange = (direction: "left" | "right") => {
    setScrollDirection(direction)
    setIsAutoScrolling(true)
  }

  const handleCardClick = (show: Show) => {
    setIsAutoScrolling(false)
    router.push(`/shows/${show.id}`)
  }

  if (liveShows.length === 0) return null

  return (
    <div className="w-full border-b border-border/30 bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-8 py-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-serif tracking-tight flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            Live Now
          </h3>
          <div className="flex gap-2">
            <Button
              onClick={() => handleDirectionChange("left")}
              size="sm"
              variant={scrollDirection === "left" ? "default" : "outline"}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => handleDirectionChange("right")}
              size="sm"
              variant={scrollDirection === "right" ? "default" : "outline"}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
        >
          {doubledShows.map((show, index) => (
            <Card
              key={`${show.id}-${index}`}
              className="flex-shrink-0 w-[200px] overflow-hidden cursor-pointer group live-show-card"
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
                      <div className="relative w-8 h-8">
                        <Image
                          src="/images/bangerboardimagelogo.png"
                          alt="BangerBoard Logo"
                          fill
                          className="object-contain opacity-50"
                        />
                      </div>
                    </div>
                  )}

                  <Badge className="absolute top-1.5 right-1.5 bg-red-500 text-white border-0 live-pulse text-[10px] px-1.5 py-0.5">
                    <span className="relative flex h-1.5 w-1.5 mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                    </span>
                    LIVE
                  </Badge>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-2 bg-card">
                  <div className="flex items-center gap-1.5 mb-1">
                    <PlatformIcon platform={show.platform} />
                    <h4 className="font-medium text-xs truncate flex-1">{show.title}</h4>
                    <FireRating rating={show.rating} size="sm" />
                  </div>
                  <p className="text-[10px] text-muted-foreground line-clamp-1 leading-relaxed">{show.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .live-show-card {
          animation: gentle-glow 2s ease-in-out infinite alternate;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
        }
        .live-show-card:hover {
          box-shadow: 0 0 25px rgba(239, 68, 68, 0.5);
        }
        @keyframes gentle-glow {
          from {
            box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
          }
          to {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
          }
        }
      `}</style>
    </div>
  )
}
