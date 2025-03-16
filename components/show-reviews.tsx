"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FireRating } from "@/components/mic-rating"
import { fetchAllReviews } from "@/app/actions/shows"
import type { Review } from "@/lib/db"

interface ShowReviewsProps {
  showId: number
  title?: string
}

export default function ShowReviews({ showId, title = "Reviews" }: ShowReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadReviews() {
      setIsLoading(true)
      try {
        const result = await fetchAllReviews()
        if (result.success) {
          // Filter reviews for this show
          const showReviews = result.reviews.filter((review) => review.showId === showId)
          setReviews(showReviews)
        } else {
          setError(result.error || "Failed to load reviews")
        }
      } catch (error) {
        console.error("Error loading reviews:", error)
        setError("Failed to load reviews")
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [showId])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No reviews found for this show.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
                <span>{new Date(review.timestamp).toLocaleDateString()}</span>
                <a href={review.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  View original
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

