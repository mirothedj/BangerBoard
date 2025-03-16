"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FireRating } from "@/components/mic-rating"
import { fetchReviewsByArtist } from "@/app/actions/shows"
import type { Review } from "@/lib/db"
import { getShows } from "@/lib/db"

export default function ArtistSearch() {
  const [artistName, setArtistName] = useState("")
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showsMap, setShowsMap] = useState<Record<number, any>>({})

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!artistName.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // Get all shows to map IDs to names
      const shows = await getShows()
      const showsById = shows.reduce(
        (acc, show) => {
          acc[show.id] = show
          return acc
        },
        {} as Record<number, any>,
      )
      setShowsMap(showsById)

      // Search for reviews
      const result = await fetchReviewsByArtist(artistName)
      if (result.success) {
        setReviews(result.reviews)
        if (result.reviews.length === 0) {
          setError(`No reviews found for artist "${artistName}"`)
        }
      } else {
        setError(result.error || "Failed to search for reviews")
      }
    } catch (error) {
      console.error("Error searching for reviews:", error)
      setError("An error occurred while searching for reviews")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search Reviews by Artist</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Enter artist name"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && <p className="text-destructive">{error}</p>}

      {reviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Reviews for {artistName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">
                      {review.artistName} {review.songTitle ? `- ${review.songTitle}` : ""}
                    </h3>
                    <FireRating rating={review.rating} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{review.reviewContent}</p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span>Show: {showsMap[review.showId]?.title || `Show #${review.showId}`}</span>
                      <span>•</span>
                      <span>{new Date(review.timestamp).toLocaleDateString()}</span>
                    </div>
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View original
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

