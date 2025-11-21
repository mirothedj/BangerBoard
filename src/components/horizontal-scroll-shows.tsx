"use client"

import { useEffect, useRef, useState } from "react"
import { useQuery } from "@/lib/mock-convex"
import { api } from "../../convex/_generated/api"
import { ShowCard } from "@/components/show-card"

interface HorizontalScrollShowsProps {
  title: string
  direction: "left" | "right"
}

export function HorizontalScrollShows({ title, direction: initialDirection }: HorizontalScrollShowsProps) {
  const [autoScrollDirection, setAutoScrollDirection] = useState(initialDirection)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollPosRef = useRef(0)
  const animationRef = useRef<number>()

  const shows = useQuery(api.shows.list)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !shows) return

    const handleScroll = () => {
      const currentScroll = container.scrollLeft
      const scrollDiff = currentScroll - scrollPosRef.current

      if (Math.abs(scrollDiff) > 5) {
        // User scrolled, detect direction
        if (scrollDiff > 0) {
          setAutoScrollDirection("right")
        } else {
          setAutoScrollDirection("left")
        }
        setIsPaused(true)
        scrollPosRef.current = currentScroll

        // Resume auto-scroll after 2 seconds
        setTimeout(() => setIsPaused(false), 2000)
      }
    }

    container.addEventListener("scroll", handleScroll)

    const animate = () => {
      if (!isPaused && container) {
        const scrollSpeed = autoScrollDirection === "right" ? 0.5 : -0.5
        container.scrollLeft += scrollSpeed

        // Loop seamlessly
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
  }, [shows, autoScrollDirection, isPaused])

  if (!shows) return null

  const doubledShows = [...shows, ...shows, ...shows]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="text-sm text-muted-foreground">Auto-scrolling {autoScrollDirection}</div>
      </div>
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-4 px-4">
          {doubledShows.map((show: any, index: number) => (
            <div key={`${show._id}-${index}`} className="flex-none w-80">
              <ShowCard show={show} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
