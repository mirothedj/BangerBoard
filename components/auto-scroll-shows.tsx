"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Youtube, Twitch, Instagram, Clock, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { FireRating } from "@/components/fire-rating"

// Platform icon mapping
const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "youtube":
      return <Youtube className="h-4 w-4" />
    case "twitch":
      return <Twitch className="h-4 w-4" />
    case "instagram":
      return <Instagram className="h-4 w-4" />
    case "tiktok":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  description: string
  link: string
  type: "ad" | "placeholder"
}

interface AutoScrollShowsProps {
  shows: Show[]
  visible: boolean
}

// Enhanced mock ads with proper visibility
const mockAds: Ad[] = [
  {
    id: "ad-1",
    imageUrl: "/music-submission.jpg",
    title: "Submit Your Music",
    description: "Get reviewed by top critics",
    link: "/submit",
    type: "ad",
  },
  {
    id: "ad-2",
    imageUrl: "/host-signup.jpg",
    title: "Become a Host",
    description: "Start your review show",
    link: "/host-signup",
    type: "ad",
  },
  {
    id: "ad-3",
    imageUrl: "/premium-membership.png",
    title: "Go Premium",
    description: "Unlock advanced features",
    link: "/premium",
    type: "ad",
  },
]

export default function AutoScrollShows({ shows, visible }: AutoScrollShowsProps) {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)

  // Sort shows to prioritize live shows
  const sortedShows = [...shows].sort((a, b) => {
    if (a.isLive && !b.isLive) return -1
    if (!a.isLive && b.isLive) return 1
    return 0
  })

  // Calculate proper container height
  useEffect(() => {
    if (scrollContainerRef.current) {
      const viewportHeight = window.innerHeight
      // Use full viewport height minus header and other elements
      setContainerHeight(viewportHeight - 300) // Adjust based on your header height
    }
  }, [])

  // Enhanced auto-scroll with proper loop
  useEffect(() => {
    if (!visible || !scrollContainerRef.current) return

    const scrollContainer = scrollContainerRef.current
    let animationId: number

    const scroll = () => {
      setScrollPosition((prev) => {
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight
        const newPosition = prev + 1.2 // Smooth scrolling speed

        // Seamless loop - reset when reaching end
        if (newPosition >= maxScroll / 2) {
          return 0
        }

        return newPosition
      })
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [visible])

  // Apply scroll position smoothly
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollPosition
    }
  }, [scrollPosition])

  const handleCardClick = (show: Show) => {
    router.push(`/shows/${show.id}`)
  }

  const handleAdClick = (ad: Ad) => {
    if (ad.type === "placeholder") {
      router.push("/join")
    } else {
      window.open(ad.link, "_blank")
    }
  }

  if (!visible) return null

  // Create enhanced grid with proper distribution
  const createEnhancedGrid = (shows: Show[], ads: Ad[]) => {
    const grid: (Show | Ad)[][] = [[], []]
    const allItems = [...shows]

    const itemsWithAds: (Show | Ad)[] = []

    allItems.forEach((show, index) => {
      itemsWithAds.push(show)

      // Insert ad every 4 shows
      if ((index + 1) % 4 === 0 && ads.length > 0) {
        const adIndex = Math.floor(index / 4) % ads.length
        itemsWithAds.push(ads[adIndex])
      }
    })

    // Add placeholder ads if we don't have enough content
    while (itemsWithAds.length < 12) {
      itemsWithAds.push({
        id: `placeholder-${itemsWithAds.length}`,
        imageUrl: "",
        title: "Join BangerBoard",
        description: "Become a member",
        link: "/join",
        type: "placeholder",
      })
    }

    // Distribute items across columns with staggering
    itemsWithAds.forEach((item, index) => {
      const columnIndex = index % 2
      grid[columnIndex].push(item)
    })

    return grid
  }

  const showGrid = createEnhancedGrid(sortedShows, mockAds)
  const cardHeight = 360
  const gap = 20
  const totalContentHeight = Math.max(showGrid[0].length, showGrid[1].length) * (cardHeight + gap)

  return (
    <div className="w-full overflow-hidden py-4 relative" style={{ height: `${containerHeight}px` }}>
      <div ref={scrollContainerRef} className="h-full overflow-y-hidden" style={{ scrollBehavior: "auto" }}>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 px-2"
          style={{
            height: `${totalContentHeight * 2}px`, // Double height for seamless loop
            minHeight: `${containerHeight * 2}px`,
          }}
        >
          {showGrid.map((column, colIndex) => (
            <div
              key={`col-${colIndex}`}
              className="flex flex-col gap-5"
              style={{
                marginTop: colIndex === 1 ? `${cardHeight / 3}px` : "0", // Stagger second column
              }}
            >
              {[...column, ...column].map((item, itemIndex) => {
                const isShow = "platform" in item
                const isAd = "type" in item && item.type === "ad"
                const isPlaceholder = "type" in item && item.type === "placeholder"

                if (isShow) {
                  const show = item as Show
                  return (
                    <Card
                      key={`show-${show.id}-${itemIndex}`}
                      className={`flex-shrink-0 overflow-hidden show-card group cursor-pointer bg-card ${
                        show.isLive ? "ring-2 ring-red-500 ring-offset-2 ring-offset-background" : ""
                      }`}
                      style={{ height: `${cardHeight}px` }}
                      onClick={() => handleCardClick(show)}
                    >
                      <CardContent className="p-0 h-full flex flex-col">
                        <div className="relative flex-1">
                          <div className="aspect-video relative overflow-hidden">
                            {show.videoId ? (
                              <iframe
                                src={`https://www.youtube.com/embed/${show.videoId}?rel=0&mute=1&autoplay=0`}
                                title={show.title}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full transition-all duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-muted to-background flex items-center justify-center">
                                <div className="relative w-16 h-16">
                                  <Image
                                    src="/images/bangerboardimagelogo.png"
                                    alt="BangerBoard Logo"
                                    fill
                                    className="object-contain opacity-50"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {show.isLive && (
                            <Badge className="absolute top-3 right-3 bg-red-500 text-white border-0 live-pulse">
                              <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                              </span>
                              LIVE
                            </Badge>
                          )}

                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <PlatformIcon platform={show.platform} />
                                <span className="text-white font-medium text-sm truncate">{show.title}</span>
                              </div>
                              <FireRating rating={show.rating} />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 flex-shrink-0 space-y-2">
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {show.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span className="truncate">{show.nextShow}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-accent text-accent" />
                              <span>{show.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                } else if (isAd) {
                  const ad = item as Ad
                  return (
                    <Card
                      key={`ad-${ad.id}-${itemIndex}`}
                      className="flex-shrink-0 overflow-hidden show-card group cursor-pointer bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20"
                      style={{ height: `${cardHeight}px` }}
                      onClick={() => handleAdClick(ad)}
                    >
                      <CardContent className="p-0 h-full flex flex-col">
                        <div className="relative flex-1">
                          <div className="aspect-video relative bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center overflow-hidden">
                            <Image
                              src={ad.imageUrl || "/placeholder.svg"}
                              alt={ad.title}
                              fill
                              className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="relative z-10 text-center text-white p-6">
                              <h3 className="font-serif text-2xl mb-2">{ad.title}</h3>
                              <p className="text-sm opacity-90">{ad.description}</p>
                            </div>
                          </div>
                          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground border-0">
                            SPONSORED
                          </Badge>
                        </div>
                        <div className="p-4 text-center">
                          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                            Learn More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                } else {
                  const placeholder = item as Ad
                  return (
                    <Card
                      key={`placeholder-${itemIndex}`}
                      className="flex-shrink-0 overflow-hidden show-card group cursor-pointer bg-gradient-to-br from-secondary to-muted"
                      style={{ height: `${cardHeight}px` }}
                      onClick={() => handleAdClick(placeholder)}
                    >
                      <CardContent className="p-0 h-full flex flex-col items-center justify-center">
                        <div className="relative w-20 h-20 mb-4">
                          <Image
                            src="/images/bangerboardimagelogo.png"
                            alt="BangerBoard Logo"
                            fill
                            className="object-contain opacity-30"
                          />
                        </div>
                        <h3 className="font-serif text-xl mb-2">{placeholder.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{placeholder.description}</p>
                        <Button variant="outline" className="mt-auto mb-4 bg-transparent">
                          Join Now
                        </Button>
                      </CardContent>
                    </Card>
                  )
                }
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
