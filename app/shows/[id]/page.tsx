"use client"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getShows } from "@/lib/db"
import { FireRating } from "@/components/mic-rating"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User, Youtube, Twitch, Instagram } from "lucide-react"
import ShowReviews from "@/components/show-reviews"

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

// Function to extract YouTube video ID from URL or use stored videoId
const getYouTubeVideoId = (show: any) => {
  if (show.url.includes("youtube.com") || show.url.includes("youtu.be")) {
    try {
      const urlObj = new URL(show.url)
      // Handle youtube.com/watch?v=VIDEO_ID
      if (show.url.includes("youtube.com/watch")) {
        return urlObj.searchParams.get("v")
      }
      // Handle youtu.be/VIDEO_ID
      if (show.url.includes("youtu.be")) {
        return urlObj.pathname.substring(1)
      }
    } catch (error) {
      console.error("Error parsing YouTube URL:", error)
    }
  }

  // Return null if no video ID found
  return null
}

// Mock host data - in a real app, this would come from your database
const HOSTS = {
  1: { name: "Bobby Smith", bio: "Music enthusiast and industry veteran with over 10 years of experience." },
  2: { name: "DJ Rhythm", bio: "Hip-hop producer and radio personality known for discovering new talent." },
}

export default async function ShowPage({ params }: { params: { id: string } }) {
  // Get the show data
  const shows = await getShows()
  const show = shows.find((s) => s.id === Number.parseInt(params.id))

  if (!show) {
    notFound()
  }

  const videoId = getYouTubeVideoId(show)
  const host = HOSTS[show.id as keyof typeof HOSTS]

  // Mock schedule data - in a real app, this would come from your database
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
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <PlatformIcon platform={show.platform} />
              <h1 className="text-3xl font-bold">{show.title}</h1>
              {show.isLive && <Badge className="bg-red-500 text-white">LIVE NOW</Badge>}
            </div>

            {host && (
              <div className="flex items-center text-muted-foreground mb-4">
                <User className="h-4 w-4 mr-1" />
                <span>Hosted by {host.name}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Next show: {show.nextShow}</span>
                </div>
                <FireRating rating={show.rating} />
              </div>

              <Button
                variant="default"
                className="bg-fire hover:bg-fire/80"
                onClick={() => window.open(show.url, "_blank")}
              >
                Watch on {show.platform.charAt(0).toUpperCase() + show.platform.slice(1)}
              </Button>
            </div>
          </div>

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
              <div className="w-full h-full bg-black flex items-center justify-center text-white">
                <p>No video available</p>
              </div>
            )}
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>About the Show</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{show.description}</p>

              {host && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">About the Host</h3>
                  <p className="text-muted-foreground">{host.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <ShowReviews showId={show.id} title="Recent Music Reviews" />
        </div>

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

          <Card>
            <CardHeader>
              <CardTitle>Ratings & Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold">{show.rating.toFixed(1)}</span>
                <FireRating rating={show.rating} />
              </div>

              <p className="text-sm text-muted-foreground mb-4">Based on community ratings</p>

              <Button className="w-full" variant="outline">
                Leave a Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

