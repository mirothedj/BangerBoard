"use client"

import { useState, useEffect } from "react"
import HorizontalScrollShows from "@/components/horizontal-scroll-shows"
import AutoScrollShows from "@/components/auto-scroll-shows"

export default function HomeContent({ shows }: { shows: any[] }) {
  const [showAutoScroll, setShowAutoScroll] = useState(true)

  // Keep auto-scroll active permanently instead of transitioning to regular list
  useEffect(() => {
    // No timeout to switch to regular list
    // Just keep the auto-scroll active
    return () => {}
  }, [])

  return (
    <div className="space-y-8">
      <HorizontalScrollShows shows={shows} />

      {showAutoScroll && <AutoScrollShows shows={shows} visible={showAutoScroll} />}
    </div>
  )
}
