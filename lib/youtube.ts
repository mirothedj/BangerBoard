// YouTube API utility functions

/**
 * Fetches the latest video thumbnail for a YouTube channel
 * @param channelId The YouTube channel ID
 * @param apiKey The YouTube API key
 * @returns Object containing videoId and thumbnailUrl
 */
export async function getLatestVideoThumbnail(channelId: string, apiKey: string) {
  try {
    if (!apiKey || apiKey.trim() === "AIzaSyDr_qD3UJqR7TqLPcJG-u6oQPwzEDJpB4A") {
      return {
        success: false,
        error: "YouTube API key is missing or empty",
      }
    }

    // Properly encode parameters
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${encodeURIComponent(channelId)}&maxResults=1&order=date&type=video&key=${encodeURIComponent(apiKey)}`

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        // If parsing fails, use the raw text
        return {
          success: false,
          error: `YouTube API error: ${response.status} - ${errorText}`,
        }
      }

      const errorMessage = errorData?.error?.message || errorData?.error?.errors?.[0]?.message || "Unknown error"
      return {
        success: false,
        error: `YouTube API error: ${response.status} - ${errorMessage}`,
      }
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      return { success: false, error: "No videos found for this channel" }
    }

    const latestVideo = data.items[0]
    const videoId = latestVideo.id.videoId
    const thumbnailUrl = latestVideo.snippet.thumbnails.high.url
    const videoTitle = latestVideo.snippet.title
    const publishedAt = latestVideo.snippet.publishedAt

    return {
      success: true,
      videoId,
      thumbnailUrl,
      videoTitle,
      publishedAt,
    }
  } catch (error) {
    console.error("Error fetching YouTube thumbnail:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch YouTube data",
    }
  }
}

/**
 * Gets channel information from YouTube API
 * @param channelId The YouTube channel ID
 * @param apiKey The YouTube API key
 * @returns Channel information
 */
export async function getChannelInfo(channelId: string, apiKey: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`,
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`YouTube API error: ${response.status} - ${errorData?.error?.message || "Unknown error"}`)
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      return { success: false, error: "Channel not found" }
    }

    const channelInfo = data.items[0]

    return {
      success: true,
      title: channelInfo.snippet.title,
      description: channelInfo.snippet.description,
      thumbnailUrl: channelInfo.snippet.thumbnails.high.url,
      subscriberCount: channelInfo.statistics.subscriberCount,
      videoCount: channelInfo.statistics.videoCount,
    }
  } catch (error) {
    console.error("Error fetching channel info:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch channel data",
    }
  }
}

/**
 * Searches for music reviews on a YouTube channel
 * @param channelId The YouTube channel ID
 * @param apiKey The YouTube API key
 * @param keywords Keywords to search for (e.g., "music review", "artist name")
 * @returns List of videos matching the search criteria
 */
export async function searchChannelForMusicReviews(
  channelId: string,
  apiKey: string,
  keywords: string[] = ["music review", "review", "reaction"],
) {
  try {
    if (!apiKey || apiKey.trim() === "") {
      return {
        success: false,
        error: "YouTube API key is missing or empty",
      }
    }

    // Create a search query with the keywords
    const query = keywords.join("|") // OR operator in YouTube search

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${encodeURIComponent(channelId)}&maxResults=10&q=${encodeURIComponent(query)}&type=video&key=${encodeURIComponent(apiKey)}`

    const response = await fetch(apiUrl)

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: `YouTube API error: ${response.status} - ${errorData?.error?.message || "Unknown error"}`,
      }
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      return {
        success: true,
        videos: [],
        message: "No music reviews found on this channel",
      }
    }

    // Process the videos to extract artist names and other relevant info
    const videos = data.items.map((item) => {
      // Try to extract artist name from title using common patterns
      // Example: "Artist Name - Song Title | REVIEW" or "REVIEWING: Artist - Song"
      const title = item.snippet.title
      let artistName = "Unknown Artist"
      let songTitle = ""

      // Pattern matching for common review title formats
      const patterns = [
        /reviewing:?\s*([^-]+)\s*-\s*(.+)/i, // "REVIEWING: Artist - Song"
        /review:?\s*([^-]+)\s*-\s*(.+)/i, // "REVIEW: Artist - Song"
        /([^-|]+)\s*-\s*([^|]+).*review/i, // "Artist - Song | REVIEW"
        /([^-|]+)\s*-\s*([^|]+)/i, // "Artist - Song" (fallback)
      ]

      for (const pattern of patterns) {
        const match = title.match(pattern)
        if (match) {
          artistName = match[1].trim()
          songTitle = match[2]?.trim() || ""
          break
        }
      }

      return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnailUrl: item.snippet.thumbnails.high.url,
        artistName,
        songTitle,
      }
    })

    return {
      success: true,
      videos,
    }
  } catch (error) {
    console.error("Error searching for music reviews:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to search for music reviews",
    }
  }
}

/**
 * Gets video details including comments that might contain reviews
 * @param videoId The YouTube video ID
 * @param apiKey The YouTube API key
 * @returns Video details and comments
 */
export async function getVideoDetailsWithComments(videoId: string, apiKey: string) {
  try {
    // First, get video details
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${apiKey}`,
    )

    if (!videoResponse.ok) {
      const errorData = await videoResponse.json()
      return {
        success: false,
        error: `YouTube API error: ${videoResponse.status} - ${errorData?.error?.message || "Unknown error"}`,
      }
    }

    const videoData = await videoResponse.json()

    if (!videoData.items || videoData.items.length === 0) {
      return { success: false, error: "Video not found" }
    }

    const videoDetails = videoData.items[0]

    // Then, get comments
    const commentsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=100&key=${apiKey}`,
    )

    if (!commentsResponse.ok) {
      // Return video details even if comments fail
      return {
        success: true,
        videoDetails: {
          title: videoDetails.snippet.title,
          description: videoDetails.snippet.description,
          publishedAt: videoDetails.snippet.publishedAt,
          viewCount: videoDetails.statistics.viewCount,
          likeCount: videoDetails.statistics.likeCount,
          commentCount: videoDetails.statistics.commentCount,
          duration: videoDetails.contentDetails.duration,
          thumbnailUrl: videoDetails.snippet.thumbnails.high.url,
        },
        comments: [],
        commentsError: "Failed to fetch comments",
      }
    }

    const commentsData = await commentsResponse.json()

    const comments =
      commentsData.items?.map((item) => ({
        id: item.id,
        authorDisplayName: item.snippet.topLevelComment.snippet.authorDisplayName,
        authorProfileImageUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
        text: item.snippet.topLevelComment.snippet.textDisplay,
        likeCount: item.snippet.topLevelComment.snippet.likeCount,
        publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
      })) || []

    return {
      success: true,
      videoDetails: {
        title: videoDetails.snippet.title,
        description: videoDetails.snippet.description,
        publishedAt: videoDetails.snippet.publishedAt,
        viewCount: videoDetails.statistics.viewCount,
        likeCount: videoDetails.statistics.likeCount,
        commentCount: videoDetails.statistics.commentCount,
        duration: videoDetails.contentDetails.duration,
        thumbnailUrl: videoDetails.snippet.thumbnails.high.url,
      },
      comments,
    }
  } catch (error) {
    console.error("Error fetching video details:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch video details",
    }
  }
}

/**
 * Extracts a channel ID from a YouTube URL
 * @param url YouTube channel or video URL
 * @returns Channel ID if found, null otherwise
 */
export function extractChannelId(url: string): string | null {
  // Handle different YouTube URL formats

  // Format: youtube.com/channel/UC...
  const channelRegex = /youtube\.com\/channel\/(UC[a-zA-Z0-9_-]{22})/i
  const channelMatch = url.match(channelRegex)
  if (channelMatch) return channelMatch[1]

  // Format: youtube.com/@username
  const usernameRegex = /youtube\.com\/@([a-zA-Z0-9_-]+)/i
  const usernameMatch = url.match(usernameRegex)
  if (usernameMatch) {
    // Note: For @username format, we'd need to make an API call to get the channel ID
    // This is a placeholder - in a real implementation, you'd need to use the YouTube API
    // to convert a username to a channel ID
    return null
  }

  // Format: youtube.com/watch?v=VIDEO_ID
  const videoRegex = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i
  const videoMatch = url.match(videoRegex)
  if (videoMatch) {
    // Note: For video URLs, we'd need to make an API call to get the channel ID
    // This is a placeholder
    return null
  }

  return null
}

/**
 * Extracts a video ID from a YouTube URL
 * @param url YouTube video URL
 * @returns Video ID if found, null otherwise
 */
export function extractVideoId(url: string): string | null {
  // Format: youtube.com/watch?v=VIDEO_ID
  const watchRegex = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i
  const watchMatch = url.match(watchRegex)
  if (watchMatch) return watchMatch[1]

  // Format: youtu.be/VIDEO_ID
  const shortRegex = /youtu\.be\/([a-zA-Z0-9_-]+)/i
  const shortMatch = url.match(shortRegex)
  if (shortMatch) return shortMatch[1]

  // Format: youtube.com/embed/VIDEO_ID
  const embedRegex = /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/i
  const embedMatch = url.match(embedRegex)
  if (embedMatch) return embedMatch[1]

  return null
}

