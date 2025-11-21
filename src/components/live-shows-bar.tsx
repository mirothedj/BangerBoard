"use client"

import { useEffect, useRef, useState } from "react"
import { useQuery } from "@/lib/mock-convex"
import { api } from "../../convex/_generated/api"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

export function LiveShowsBar() {
  const [autoScrollDirection, setAutoScrollDirection] = useState<"left" | "right">("right")
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollPosRef = useRef(0)
  const animationRef = useRef<number>()

  const liveShows = useQuery(api.shows.getLiveShows)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !liveShows) return

    const handleScroll = () => {
      const currentScroll = container.scrollLeft
      const scrollDiff = currentScroll - scrollPosRef.current

      if (Math.abs(scrollDiff) > 5) {
        if (scrollDiff > 0) {
          setAutoScrollDirection("right")
        } else {
          setAutoScrollDirection("left")
        }
        setIsPaused(true)
        scrollPosRef.current = currentScroll

        setTimeout(() => setIsPaused(false), 2000)
      }
    }

    container.addEventListener("scroll", handleScroll)

    const animate = () => {
      if (!isPaused && container) {
        const scrollSpeed = autoScrollDirection === "right" ? 0.3 : -0.3
        container.scrollLeft += scrollSpeed

        const maxScroll = container.scrollWidth / 2
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft = maxScroll
        }
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      container.removeEventListener("scroll", handleScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [liveShows, autoScrollDirection, isPaused])

  if (!liveShows || liveShows.length === 0) return null

  const doubledShows = [...liveShows, ...liveShows, ...liveShows]

  return (
    <div className="border-b border-border/40 bg-card/50 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="destructive" className="animate-pulse">
            LIVE NOW
          </Badge>
          <span className="text-sm text-muted-foreground">{liveShows.length} shows streaming</span>
        </div>
        <div
          ref={containerRef}
          className="overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-4">
            {doubledShows.map((show: any, index: number) => (
              <Card
                key={`${show._id}-${index}`}
                className="flex-none w-48 h-28 overflow-hidden cursor-pointer group relative border-primary/50 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all"
              >
                <img
                  src={show.thumbnailUrl || "/placeholder.svg?height=112&width=192"}
                  alt={show.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 flex flex-col justify-end">
                  <p className="text-xs font-semibold line-clamp-1 text-white">{show.title}</p>
                  <div className="flex items-center gap-1 text-xs text-white/80">
                    <Eye className="h-3 w-3" />
                    <span>{show.viewCount.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
