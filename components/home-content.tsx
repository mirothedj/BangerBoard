"use client"

import { useState, useEffect } from "react"
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
    <>
      {/* Only show the auto-scrolling section */}
      {showAutoScroll && <AutoScrollShows shows={shows} visible={showAutoScroll} />}
    </>
  )
}

