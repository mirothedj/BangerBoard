"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FireRating } from "@/components/mic-rating"
import { shows, reviews } from "@/lib/data"

interface Review {
  id: number
  showId: number
  title: string
  content: string
  rating: number
  author: string
  createdAt: string
}

export default function ArtistSearch() {
  const [artistName, setArtistName] = useState("")
  const [searchResults, setSearchResults] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!artistName.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // Search for reviews that mention the artist name
      const results = reviews.filter(review => 
        review.title.toLowerCase().includes(artistName.toLowerCase()) ||
        review.content.toLowerCase().includes(artistName.toLowerCase())
      )

      setSearchResults(results)
      if (results.length === 0) {
        setError(`No reviews found for artist "${artistName}"`)
      }
    } catch (error) {
      setError("An error occurred while searching")
      console.error("Search error:", error)
    }

    setIsLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Enter artist name..."
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {searchResults.length > 0 && (
        <div className="space-y-4">
          {searchResults.map((review) => {
            const show = shows.find((s) => s.id === review.showId)
            return (
              <Card key={review.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{review.title}</span>
                    <FireRating rating={review.rating} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{review.content}</p>
                  <div className="text-sm text-muted-foreground">
                    <p>Show: {show?.title}</p>
                    <p>
                      Reviewed by {review.author} on{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

