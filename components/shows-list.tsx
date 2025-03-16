"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Youtube, Twitch, Instagram, Clock, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { fetchShows, refreshYouTubeThumbnails } from "@/app/actions/shows"
import { toast } from "@/hooks/use-toast"
import { FireRating } from "@/components/fire-rating"

// Default placeholder shows while loading
const DEFAULT_SHOWS = [
  {
    id: 1,
    title: "Loading...",
    description: "Loading show information",
    platform: "youtube",
    url: "#",
    thumbnail: "/placeholder.svg?height=400&width=400",
    rating: 0,
    nextShow: "Loading...",
    isLive: false,
  },
  // Add more placeholder items if needed
]

// Default placeholder video ID for embedding when no specific video is available
const DEFAULT_PLACEHOLDER_VIDEO_ID = "19g66ezsKAg" // Replace with your preferred placeholder video ID

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
            fill="currentColor"
          />
        </svg>
      )
    default:
      return null
  }
}

// Function to extract YouTube video ID from URL or use stored videoId
const getYouTubeVideoId = (show: ShowProps["show"]) => {
  // If we already have a videoId from the API, use it
  if (show.videoId) return show.videoId

  // Otherwise try to extract from URL
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

export default function ShowsList() {
  const [activeTab, setActiveTab] = useState("all")
  const [shows, setShows] = useState(DEFAULT_SHOWS)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch shows on component mount
  useEffect(() => {
    const loadShows = async () => {
      setIsLoading(true)
      try {
        const result = await fetchShows()
        if (result.success && result.shows) {
          setShows(result.shows)
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to load shows",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error loading shows:", error)
        toast({
          title: "Error",
          description: "Failed to load shows",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadShows()
  }, [])

  // Update the handleRefreshThumbnails function to provide better error feedback

  // Handle refreshing YouTube thumbnails
  const handleRefreshThumbnails = async () => {
    setIsRefreshing(true)
    try {
      const result = await refreshYouTubeThumbnails()
      if (result.success) {
        toast({
          title: result.usingFallback ? "Using Fallback Thumbnails" : "Success",
          description: result.message || "YouTube thumbnails updated",
          variant: result.usingFallback ? "default" : "default",
        })

        // Reload shows to get updated thumbnails
        const showsResult = await fetchShows()
        if (showsResult.success && showsResult.shows) {
          setShows(showsResult.shows)
        }
      } else {
        console.error("Error refreshing thumbnails:", result.error)
        toast({
          title: "Error",
          description: result.error || "Failed to refresh thumbnails",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error refreshing thumbnails:", error)
      toast({
        title: "Error",
        description:
          error instanceof Error ? `Failed to refresh thumbnails: ${error.message}` : "Failed to refresh thumbnails",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  // Filter shows based on active tab
  const filteredShows = activeTab === "all" ? shows : shows.filter((show) => show.platform === activeTab)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6 bg-black/30 backdrop-blur-md p-1 rounded-lg">
          <TabsTrigger
            value="all"
            className="flex items-center justify-center bg-black/60 backdrop-blur-md border border-gray-800 text-gray-300
                      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] 
                      data-[state=active]:bg-gradient-to-b data-[state=active]:from-gray-700 data-[state=active]:to-gray-900
                      data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(255,60,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.2)]
                      transition-all duration-200"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="youtube"
            className="flex items-center justify-center gap-1 bg-black/60 backdrop-blur-md border border-gray-800 text-gray-300
                      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] 
                      data-[state=active]:bg-gradient-to-b data-[state=active]:from-gray-700 data-[state=active]:to-gray-900
                      data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(255,60,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.2)]
                      transition-all duration-200"
          >
            <Youtube className="h-4 w-4" /> YouTube
          </TabsTrigger>
          <TabsTrigger
            value="twitch"
            className="flex items-center justify-center gap-1 bg-black/60 backdrop-blur-md border border-gray-800 text-gray-300
                      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] 
                      data-[state=active]:bg-gradient-to-b data-[state=active]:from-gray-700 data-[state=active]:to-gray-900
                      data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(255,60,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.2)]
                      transition-all duration-200"
          >
            <Twitch className="h-4 w-4" /> Twitch
          </TabsTrigger>
          <TabsTrigger
            value="instagram"
            className="flex items-center justify-center gap-1 bg-black/60 backdrop-blur-md border border-gray-800 text-gray-300
                      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] 
                      data-[state=active]:bg-gradient-to-b data-[state=active]:from-gray-700 data-[state=active]:to-gray-900
                      data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(255,60,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.2)]
                      transition-all duration-200"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </TabsTrigger>
          <TabsTrigger
            value="tiktok"
            className="flex items-center justify-center gap-1 bg-black/60 backdrop-blur-md border border-gray-800 text-gray-300
                      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] 
                      data-[state=active]:bg-gradient-to-b data-[state=active]:from-gray-700 data-[state=active]:to-gray-900
                      data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(255,60,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.2)]
                      transition-all duration-200"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"
                fill="currentColor"
              />
            </svg>{" "}
            TikTok
          </TabsTrigger>
        </TabsList>

        {/* Tab content for each platform */}
        {["all", "youtube", "twitch", "instagram", "tiktok"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-fire" />
              </div>
            ) : filteredShows.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No shows found for this platform</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                {filteredShows.map((show) => (
                  <ShowCard key={show.id} show={show} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

interface ShowProps {
  show: {
    id: number
    title: string
    description: string
    platform: string
    url: string
    thumbnail: string
    channelId?: string
    videoId?: string
    rating: number
    nextShow: string
    isLive: boolean
  }
}

// Update the rating display in the ShowCard component to use FireRating
function ShowCard({ show }: ShowProps) {
  const router = useRouter()
  const [isClicking, setIsClicking] = useState(false)

  // Function to get the appropriate thumbnail
  const getThumbnail = () => {
    // For YouTube shows, use the YouTube thumbnail from our database
    if (show.platform === "youtube" && show.thumbnail && show.thumbnail.includes("ytimg.com")) {
      return show.thumbnail
    }

    // For other platforms or if YouTube thumbnail is not available, use placeholder
    return show.thumbnail || "/placeholder.svg?height=400&width=400"
  }

  // Get YouTube video ID if applicable
  const videoId = show.platform === "youtube" ? getYouTubeVideoId(show) : null

  // Handle card click with TV turn off effect
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsClicking(true)

    // Navigate to show profile page after animation completes
    setTimeout(() => {
      router.push(`/shows/${show.id}`)
    }, 600) // Match this with the animation duration
  }

  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      <Card
        className={`overflow-hidden border-2 border-[#FF5F00] p-2 show-card group ${isClicking ? "tv-turn-off" : ""}`}
      >
        <CardContent className="p-0">
          <div className="relative">
            <div className="aspect-video relative">
              {show.platform === "youtube" && videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  title={show.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full shadow-[0_0_15px_rgba(255,60,0,0.6)] transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(255,60,0,0.8)]"
                />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${DEFAULT_PLACEHOLDER_VIDEO_ID}?rel=0&mute=1`}
                    title="Previous Shows"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full shadow-[0_0_15px_rgba(255,60,0,0.6)] transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(255,60,0,0.8)]"
                  />
                </div>
              )}
            </div>

            {show.isLive && <Badge className="absolute top-2 right-2 bg-red-500 text-white">LIVE NOW</Badge>}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={show.platform} />
                  <span className="text-white font-medium">{show.title}</span>
                </div>
                <FireRating rating={show.rating} />
              </div>
            </div>
          </div>

          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-2">{show.description}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{show.nextShow}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

