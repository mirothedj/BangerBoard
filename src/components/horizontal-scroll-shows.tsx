"use client"

import { useState } from "react"
import { useQuery } from "@/lib/mock-convex"
import { api } from "../../convex/_generated/api"
import { ShowCard } from "@/components/show-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HorizontalScrollShowsProps {
  title: string
  direction: "left" | "right"
}

export function HorizontalScrollShows({ title, direction: initialDirection }: HorizontalScrollShowsProps) {
  const [direction, setDirection] = useState(initialDirection)
  const shows = useQuery(api.shows.list)

  if (!shows) return null

  const doubledShows = [...shows, ...shows]

  const toggleDirection = () => {
    setDirection((prev) => (prev === "left" ? "right" : "left"))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={toggleDirection} className="h-8 w-8 bg-transparent">
            {direction === "left" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div className={`flex gap-4 ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}`}>
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
