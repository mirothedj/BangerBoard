import type { Metadata } from "next"
import { Suspense } from "react"
import ArtistSearch from "@/components/artist-search"

export const metadata: Metadata = {
  title: "Show Reviews | BangerBoard",
  description: "Search for reviews of your music across multiple platforms",
}

export default function ArtistsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Artist Reviews</h1>
      <p className="text-muted-foreground mb-6">
        Search for reviews of your music across YouTube, Twitch, Instagram, and TikTok
      </p>

      <Suspense fallback={<div>Loading search...</div>}>
        <ArtistSearch />
      </Suspense>
    </div>
  )
}
