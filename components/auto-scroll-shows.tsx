"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Youtube, Twitch, Instagram, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { FireRating } from "@/components/fire-rating"
import EzoicAd from "./ezoic-ad"
import { AdPlaceholders, destroyPlaceholders, showAds } from "@/lib/ezoic"

// Platform icon mapping
const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "youtube":
      return <Youtube className="h-5 w-5 text-red-500" />
    case "twitch":
      return <Twitch className="h-5 w-5 text-purple-500" />
    case "instagram":
      return <Instagram className="h-5 w-5 text-pink-500" />
    case "tiktok":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

interface Ad {
  id: string
  imageUrl: string
  title: string
  link: string
}

interface AutoScrollShowsProps {
  shows: Show[]
  visible: boolean
}

// The scroll placeholders we'll use for Ezoic infinite scroll ads
const scrollPlaceholders = [
  AdPlaceholders.SCROLL_1,
  AdPlaceholders.SCROLL_2,
  AdPlaceholders.SCROLL_3,
  AdPlaceholders.SCROLL_4,
  AdPlaceholders.SCROLL_5
];

export default function AutoScrollShows({ shows, visible }: AutoScrollShowsProps) {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activePlaceholders, setActivePlaceholders] = useState<number[]>([]);

  // Sort shows to prioritize live shows
  const sortedShows = [...shows].sort((a, b) => {
    if (a.isLive && !b.isLive) return -1
    if (!a.isLive && b.isLive) return 1
    return 0
  })

  // Auto-scroll effect (vertical, top to bottom)
  useEffect(() => {
    if (!visible || !scrollContainerRef.current) return

    const scrollContainer = scrollContainerRef.current
    const totalHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight

    // Start from the top
    setScrollPosition(0)

    const scrollInterval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPosition = prev + 2 // Increased from 1 to 2 for faster scrolling

        // Reset to beginning when reaching the end
        if (newPosition >= totalHeight) {
          return 0
        }

        return newPosition
      })
    }, 30) // Decreased from 50 to 30 for faster scrolling

    return () => clearInterval(scrollInterval)
  }, [visible])

  // Apply scroll position (vertical)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollPosition
    }
  }, [scrollPosition])

  // Clean up Ezoic ads when component unmounts
  useEffect(() => {
    return () => {
      if (activePlaceholders.length > 0) {
        destroyPlaceholders(...activePlaceholders);
      }
    };
  }, [activePlaceholders]);

  // Manage active placeholders
  const trackAdPlaceholder = (id: number) => {
    setActivePlaceholders(prev => 
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const handleCardClick = (show: Show) => {
    router.push(`/shows/${show.id}`)
  }

  const handleAdClick = (ad: Ad) => {
    window.open(ad.link, "_blank")
  }

  if (!visible) return null

  // Create a 2D array for the grid layout with ads inserted
  const createShowGridWithAds = (shows: Show[]) => {
    const grid: (Show | "ezoic-ad" | "placeholder")[][] = [[], []]
    
    let currentPlaceholderIndex = 0;

    // Insert shows into grid
    shows.forEach((show, index) => {
      const columnIndex = index % 2
      grid[columnIndex].push(show)

      // Insert Ezoic ad after every 4 shows (approximately)
      if (index > 0 && index % 4 === 0 && currentPlaceholderIndex < scrollPlaceholders.length) {
        // Insert into the opposite column for staggering effect
        const oppositeColumn = columnIndex === 0 ? 1 : 0
        grid[oppositeColumn].push("ezoic-ad")
        currentPlaceholderIndex++;
      }
    })

    // Ensure at least one ad in each column
    if (!grid[0].some(item => typeof item === "string" && item === "ezoic-ad")) {
      grid[0].splice(Math.min(2, grid[0].length), 0, "ezoic-ad")
    }

    if (!grid[1].some(item => typeof item === "string" && item === "ezoic-ad")) {
      grid[1].splice(Math.min(2, grid[1].length), 0, "ezoic-ad")
    }

    return grid
  }

  const showGrid = createShowGridWithAds(sortedShows)

  return (
    <div className="w-full h-[600px] overflow-y-hidden py-4" ref={scrollContainerRef}>
      <div
        className="grid grid-cols-2 gap-4"
        style={{ height: `${Math.max(showGrid[0].length, showGrid[1].length) * 320}px` }}
      >
        {showGrid.map((column, colIndex) => (
          <div
            key={`col-${colIndex}`}
            className="flex flex-col gap-4"
            style={{ marginTop: colIndex === 1 ? "160px" : "0" }} // Stagger the second column
          >
            {column.map((item, itemIndex) => {
              // Show card
              if (typeof item !== "string" && "platform" in item) {
                const show = item;
                return (
                  <Card
                    key={`show-${show.id}`}
                    className={`flex-shrink-0 overflow-hidden border-2 ${
                      show.isLive ? "border-red-600" : "border-[#FF5F00]"
                    } p-2 show-card group cursor-pointer`}
                    onClick={() => handleCardClick(show)}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="aspect-video relative">
                          {show.videoId ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${show.videoId}?rel=0&mute=1`}
                              title={show.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className={`absolute top-0 left-0 w-full h-full ${
                                show.isLive
                                  ? "shadow-[0_0_15px_rgba(255,0,0,0.8)]"
                                  : "shadow-[0_0_15px_rgba(255,60,0,0.6)]"
                              } transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(255,60,0,0.8)]`}
                            />
                          ) : (
                            <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                              <div className="relative w-24 h-24">
                                <Image
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BangerBoardImageLogo-SvaIEbajz66iZh24Mt6YMlohGEm9tm.png"
                                  alt="BangerBoard Logo"
                                  fill
                                  className="object-contain animate-pulse-glow-slow"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {show.isLive && (
                          <Badge className="absolute top-2 right-2 bg-red-600 text-white animate-pulse-slow">
                            LIVE NOW
                          </Badge>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <PlatformIcon platform={show.platform} />
                              <span className="text-white font-medium">{show.title}</span>
                            </div>
                            <FireRating rating={show.rating} />
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="text-sm text-muted-foreground mb-2">{show.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{show.nextShow}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              }
              // Ezoic ad placeholder
              else if (typeof item === "string" && item === "ezoic-ad") {
                const placeholderId = scrollPlaceholders[itemIndex % scrollPlaceholders.length];
                return (
                  <Card
                    key={`ezoic-ad-${colIndex}-${itemIndex}`}
                    className="flex-shrink-0 overflow-hidden border border-muted p-0"
                  >
                    <EzoicAd 
                      id={placeholderId}
                      className="aspect-video w-full"
                      onAdLoaded={() => trackAdPlaceholder(placeholderId)}
                    />
                  </Card>
                )
              }
              // Empty placeholder (shouldn't normally happen)
              else {
                return null;
              }
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
