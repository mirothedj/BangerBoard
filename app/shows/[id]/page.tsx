"use client"

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getShowById, getHostById, getReviewsByShowId } from "@/lib/db"
import { FireRating } from "@/components/fire-rating"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Youtube,
  Twitch,
  Instagram,
  Heart,
  MessageCircle,
  Share,
  CheckCircle,
} from "lucide-react"

// Platform icon mapping
const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "youtube":
      return <Youtube className="h-5 w-5 text-red-500" />
    case "twitch":
      return <Twitch className="h-5 w-5 text-purple-500" />
    case "instagram":
      return <Instagram className="h-5 w-5 text-pink-500" />
    case "tiktok":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"
            fill="#00F2EA"
          />
        </svg>
      )
    default:
      return null
  }
}

// Function to extract YouTube video ID
const getYouTubeVideoId = (show: any) => {
  if (show.videoId) return show.videoId

  if (show.url.includes("youtube.com") || show.url.includes("youtu.be")) {
    try {
      const urlObj = new URL(show.url)
      if (show.url.includes("youtube.com/watch")) {
        return urlObj.searchParams.get("v")
      }
      if (show.url.includes("youtu.be")) {
        return urlObj.pathname.substring(1)
      }
    } catch (error) {
      console.error("Error parsing YouTube URL:", error)
    }
  }
  return null
}

export default async function ShowPage({ params }: { params: { id: string } }) {
  const showId = Number.parseInt(params.id)
  const show = await getShowById(showId)

  if (!show) {
    notFound()
  }

  const host = show.hostId ? await getHostById(show.hostId) : null
  const reviews = await getReviewsByShowId(showId)
  const videoId = getYouTubeVideoId(show)

  // Mock schedule data
  const schedules = [
    { day: "Monday", time: "8:00 PM EST" },
    { day: "Wednesday", time: "9:00 PM EST" },
    { day: "Friday", time: "7:30 PM EST" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shows
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Show Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <PlatformIcon platform={show.platform} />
              <h1 className="text-3xl font-bold">{show.title}</h1>
              {show.isLive && <Badge className="bg-red-500 text-white animate-pulse">LIVE NOW</Badge>}
            </div>

            {host && (
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={host.avatar || "/placeholder.svg"}
                  alt={host.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Hosted by {host.name}</span>
                  {host.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Next show: {show.nextShow}</span>
                </div>
                <FireRating rating={show.rating} />
                <span className="text-sm text-muted-foreground">({show.rating}/6)</span>
              </div>

              <Button
                variant="default"
                className="bg-fire hover:bg-fire/80"
                onClick={() => window.open(show.url, "_blank")}
              >
                Watch on {show.platform.charAt(0).toUpperCase() + show.platform.slice(1)}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
              <span>{show.viewCount?.toLocaleString()} views</span>
              <span>{show.engagementRate}% engagement</span>
              <span>{reviews.length} reviews</span>
            </div>
          </div>

          {/* Video Player */}
          <div className="aspect-video relative mb-6 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,60,0,0.6)]">
            {show.platform === "youtube" && videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                title={show.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src="/images/design-mode/BangerBoardImageLogo.png"
                      alt="BangerBoard Logo"
                      fill
                      className="object-contain animate-pulse-glow-slow"
                    />
                  </div>
                  <p>Visit {show.platform} to watch latest content</p>
                </div>
              </div>
            )}
          </div>

          {/* About Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>About the Show</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{show.description}</p>

              {host && (
                <div>
                  <Separator className="my-4" />
                  <div className="flex items-start gap-4">
                    <Image
                      src={host.avatar || "/placeholder.svg"}
                      alt={host.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{host.name}</h3>
                        {host.verified && <CheckCircle className="h-5 w-5 text-blue-500" />}
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{host.bio}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{host.totalReviews} reviews</span>
                        <span>{host.avgRating}/6 avg rating</span>
                        <span>Joined {new Date(host.joinedDate).getFullYear()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Music Reviews
                <Badge variant="secondary">{reviews.length} reviews</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-0">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {review.artistName}
                          {review.songTitle && ` - ${review.songTitle}`}
                        </h3>
                        {review.albumTitle && <p className="text-sm text-muted-foreground">from {review.albumTitle}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <FireRating rating={review.rating} />
                        {review.isVerified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">{review.reviewContent}</p>

                    {/* Review Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{new Date(review.timestamp).toLocaleDateString()}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{review.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>Reply</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share className="h-4 w-4" />
                          <span>Share</span>
                        </div>
                      </div>
                    </div>

                    {/* Host Response */}
                    {review.hostResponse && (
                      <div className="bg-muted/50 rounded-lg p-4 ml-6">
                        <div className="flex items-center gap-2 mb-2">
                          {host && (
                            <Image
                              src={host.avatar || "/placeholder.svg"}
                              alt={host.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                          )}
                          <span className="font-medium text-sm">{host?.name || "Host"}</span>
                          <Badge variant="outline" className="text-xs">
                            Host
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.hostResponseTimestamp!).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{review.hostResponse}</p>
                      </div>
                    )}
                  </div>
                ))}

                {reviews.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No reviews yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              {schedules.map((schedule, index) => (
                <div key={index} className="flex justify-between py-2 border-b last:border-0">
                  <span className="font-medium">{schedule.day}</span>
                  <span className="text-muted-foreground">{schedule.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Community Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold">{show.rating.toFixed(1)}</span>
                <FireRating rating={show.rating} />
              </div>

              <p className="text-sm text-muted-foreground mb-4">Based on {reviews.length} community reviews</p>

              <Button className="w-full bg-transparent" variant="outline">
                Leave a Review
              </Button>
            </CardContent>
          </Card>

          {host && (
            <Card>
              <CardHeader>
                <CardTitle>About the Host</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Image
                    src={host.avatar || "/placeholder.svg"}
                    alt={host.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-3"
                  />
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="font-semibold">{host.name}</h3>
                    {host.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{host.bio}</p>

                  <div className="grid grid-cols-2 gap-4 text-center mb-4">
                    <div>
                      <div className="font-bold">{host.totalReviews}</div>
                      <div className="text-xs text-muted-foreground">Reviews</div>
                    </div>
                    <div>
                      <div className="font-bold">{host.avgRating}/6</div>
                      <div className="text-xs text-muted-foreground">Avg Rating</div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Follow Host
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
