import { NextResponse } from "next/server"
import { getShows, updateShowThumbnail } from "@/lib/db"

export async function GET() {
  try {
    // Check if YouTube API key is available
    const youtubeApiKey = process.env.YOUTUBE_API_KEY

    if (!youtubeApiKey || youtubeApiKey.trim() === "") {
      console.log("YouTube API key is missing or empty - using fallback thumbnails")

      // Get all YouTube shows from the database
      const shows = await getShows()
      const youtubeShows = shows.filter((show) => show.platform === "youtube" && show.channelId)

      if (youtubeShows.length === 0) {
        return NextResponse.json({
          success: true,
          message: "No YouTube shows found to update",
          results: [],
        })
      }

      // Use fallback thumbnails
      const fallbackVideos = [
        { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up" },
        { id: "jNQXAC9IVRw", title: "Me at the zoo" },
        { id: "9bZkp7q19f0", title: "PSY - Gangnam Style" },
        { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito ft. Daddy Yankee" },
      ]

      const results = await Promise.all(
        youtubeShows.map(async (show, index) => {
          try {
            // Use a different fallback video for each show
            const fallback = fallbackVideos[index % fallbackVideos.length]
            const videoId = fallback.id
            const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

            // Update the show's thumbnail in the database
            await updateShowThumbnail(show.id, thumbnailUrl, videoId)

            return {
              showId: show.id,
              title: show.title,
              videoId,
              thumbnailUrl,
              success: true,
              usingFallback: true,
            }
          } catch (error) {
            console.error(`Error updating thumbnail for show ${show.id}:`, error)
            return {
              showId: show.id,
              title: show.title,
              success: false,
              error: error instanceof Error ? error.message : "Unknown error",
            }
          }
        }),
      )

      return NextResponse.json({
        success: true,
        message: "YouTube thumbnails updated using fallback method",
        results,
        timestamp: new Date().toISOString(),
        usingFallback: true,
      })
    }

    // Get all YouTube shows from the database
    const shows = await getShows()
    const youtubeShows = shows.filter((show) => show.platform === "youtube" && show.channelId)

    if (youtubeShows.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No YouTube shows found to update",
        results: [],
      })
    }

    // Process each YouTube show
    const updatePromises = youtubeShows.map(async (show) => {
      try {
        // Use a mock/fallback approach instead of the actual API
        // This is a temporary solution until the API key issue is resolved
        const videoId = show.id === 1 ? "dQw4w9WgXcQ" : "jNQXAC9IVRw"
        const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

        // Update the show's thumbnail in the database
        await updateShowThumbnail(show.id, thumbnailUrl, videoId)

        return {
          showId: show.id,
          title: show.title,
          videoId,
          thumbnailUrl,
          success: true,
          usingFallback: true,
        }
      } catch (error) {
        console.error(`Error updating thumbnail for show ${show.id}:`, error)
        return {
          showId: show.id,
          title: show.title,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        }
      }
    })

    const results = await Promise.all(updatePromises)

    return NextResponse.json({
      success: true,
      message: "YouTube thumbnails updated (using fallback method)",
      results,
      timestamp: new Date().toISOString(),
      usingFallback: true,
    })
  } catch (error) {
    console.error("Error updating YouTube thumbnails:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update YouTube thumbnails",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
