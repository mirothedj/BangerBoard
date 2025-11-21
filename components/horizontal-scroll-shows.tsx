"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Youtube, Twitch, Instagram, Clock, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { FireRating } from "@/components/fire-rating"

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

interface HorizontalScrollShowsProps {
  shows: Show[]
}

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

export default function HorizontalScrollShows({ shows }: HorizontalScrollShowsProps) {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const animationRef = useRef<number>()

  // Auto-scroll animation
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const scroll = () => {
      setScrollPosition((prev) => {
        const maxScroll = container.scrollWidth - container.clientWidth
        const newPosition = prev + 0.8

        if (newPosition >= maxScroll / 2) {
          return 0
        }

        return newPosition
      })
      animationRef.current = requestAnimationFrame(scroll)
    }

    animationRef.current = requestAnimationFrame(scroll)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollPosition
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

  // Create content with ads interspersed
  const createContent = () => {
    const items: (Show | Ad)[] = []
    shows.forEach((show, index) => {
      items.push(show)
      if ((index + 1) % 4 === 0 && mockAds.length > 0) {
        const adIndex = Math.floor(index / 4) % mockAds.length
        items.push(mockAds[adIndex])
      }
    })
    return [...items, ...items] // Double for seamless loop
  }

  const content = createContent()

  return (
    <div className="w-full overflow-hidden py-6">
      <h3 className="text-xl font-serif tracking-tight mb-4 px-4 lg:px-0">Upcoming Shows</h3>
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-hidden px-4 lg:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {content.map((item, index) => {
          const isShow = "platform" in item
          const isAd = "type" in item && item.type === "ad"

          if (isShow) {
            const show = item as Show
            return (
              <Card
                key={`show-${show.id}-${index}`}
                className="flex-shrink-0 w-[320px] overflow-hidden show-card group cursor-pointer bg-card"
                onClick={() => handleCardClick(show)}
              >
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative">
                    <div className="aspect-video relative overflow-hidden">
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
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-start gap-2 mb-2">
                      <PlatformIcon platform={show.platform} />
                      <h4 className="font-medium text-sm flex-1 line-clamp-1">{show.title}</h4>
                      <FireRating rating={show.rating} size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3 flex-1">
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
                key={`ad-${ad.id}-${index}`}
                className="flex-shrink-0 w-[320px] overflow-hidden show-card group cursor-pointer bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20"
                onClick={() => handleAdClick(ad)}
              >
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center overflow-hidden">
                    <Image
                      src={ad.imageUrl || "/placeholder.svg"}
                      alt={ad.title}
                      fill
                      className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="relative z-10 text-center text-white p-6">
                      <h3 className="font-serif text-xl mb-2">{ad.title}</h3>
                      <p className="text-sm opacity-90">{ad.description}</p>
                    </div>
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground border-0">
                      SPONSORED
                    </Badge>
                  </div>
                  <div className="p-4">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
