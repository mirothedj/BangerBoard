"use client"

import { useEffect, useRef, useState } from "react"
import { useQuery } from "@/lib/mock-convex"
import { api } from "../../convex/_generated/api"
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
    <div className="border-b border-border/10 bg-background/80 backdrop-blur-sm neo-subtle z-10 relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="destructive" className="animate-pulse shadow-lg shadow-red-500/20">
            LIVE NOW
          </Badge>
          <span className="text-sm text-muted-foreground font-medium neo-text">{liveShows.length} shows streaming</span>
        </div>
        <div
          ref={containerRef}
          className="overflow-x-auto overflow-y-hidden scrollbar-hide py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-6 px-2">
            {doubledShows.map((show: any, index: number) => (
              <div
                key={`${show._id}-${index}`}
                className="flex-none w-48 h-28 rounded-xl overflow-hidden cursor-pointer group relative neo-raised hover:neo-flat transition-all duration-300 transform hover:scale-[1.02]"
              >
                <img
                  src={show.thumbnailUrl || "/placeholder.svg?height=112&width=192"}
                  alt={show.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                  <p className="text-xs font-bold line-clamp-1 text-white drop-shadow-md">{show.title}</p>
                  <div className="flex items-center gap-1 text-[10px] text-white/90 font-medium">
                    <Eye className="h-3 w-3" />
                    <span>{show.viewCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
