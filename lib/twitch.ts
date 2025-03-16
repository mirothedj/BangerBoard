// Twitch API utility functions

/**
 * Gets an OAuth token for Twitch API
 * @param clientId Twitch Client ID
 * @param clientSecret Twitch Client Secret
 * @returns OAuth token
 */
export async function getTwitchOAuthToken(clientId: string, clientSecret: string) {
  try {
    const response = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      {
        method: "POST",
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: `Twitch API error: ${response.status} - ${errorData?.message || "Unknown error"}`,
      }
    }

    const data = await response.json()
    return {
      success: true,
      accessToken: data.access_token,
      expiresIn: data.expires_in,
    }
  } catch (error) {
    console.error("Error getting Twitch OAuth token:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get Twitch OAuth token",
    }
  }
}

/**
 * Gets information about a Twitch channel
 * @param username Twitch username
 * @param clientId Twitch Client ID
 * @param accessToken OAuth access token
 * @returns Channel information
 */
export async function getTwitchChannelInfo(username: string, clientId: string, accessToken: string) {
  try {
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: `Twitch API error: ${response.status} - ${errorData?.message || "Unknown error"}`,
      }
    }

    const data = await response.json()

    if (!data.data || data.data.length === 0) {
      return { success: false, error: "Channel not found" }
    }

    const channelInfo = data.data[0]

    return {
      success: true,
      id: channelInfo.id,
      login: channelInfo.login,
      displayName: channelInfo.display_name,
      description: channelInfo.description,
      profileImageUrl: channelInfo.profile_image_url,
      offlineImageUrl: channelInfo.offline_image_url,
      viewCount: channelInfo.view_count,
      createdAt: channelInfo.created_at,
    }
  } catch (error) {
    console.error("Error fetching Twitch channel info:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch Twitch channel data",
    }
  }
}

/**
 * Gets videos from a Twitch channel
 * @param userId Twitch user ID
 * @param clientId Twitch Client ID
 * @param accessToken OAuth access token
 * @returns List of videos
 */
export async function getTwitchChannelVideos(userId: string, clientId: string, accessToken: string) {
  try {
    const response = await fetch(`https://api.twitch.tv/helix/videos?user_id=${userId}&first=10`, {
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: `Twitch API error: ${response.status} - ${errorData?.message || "Unknown error"}`,
      }
    }

    const data = await response.json()

    if (!data.data) {
      return { success: true, videos: [] }
    }

    // Process videos to extract music review content
    const videos = data.data.map((video: any) => {
      // Try to identify music reviews based on title/description
      const isMusicReview =
        video.title.toLowerCase().includes("review") ||
        video.title.toLowerCase().includes("reaction") ||
        video.description.toLowerCase().includes("music review") ||
        video.description.toLowerCase().includes("artist")

      return {
        id: video.id,
        userId: video.user_id,
        title: video.title,
        description: video.description,
        url: video.url,
        thumbnailUrl: video.thumbnail_url.replace("%{width}", "640").replace("%{height}", "360"),
        publishedAt: video.published_at,
        duration: video.duration,
        viewCount: video.view_count,
        isMusicReview,
      }
    })

    // Filter to only include likely music reviews
    const musicReviews = videos.filter((video) => video.isMusicReview)

    return {
      success: true,
      videos: musicReviews,
      allVideos: videos,
    }
  } catch (error) {
    console.error("Error fetching Twitch videos:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch Twitch videos",
    }
  }
}

/**
 * Checks if a Twitch channel is currently live
 * @param userId Twitch user ID
 * @param clientId Twitch Client ID
 * @param accessToken OAuth access token
 * @returns Live status
 */
export async function isTwitchChannelLive(userId: string, clientId: string, accessToken: string) {
  try {
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: `Twitch API error: ${response.status} - ${errorData?.message || "Unknown error"}`,
      }
    }

    const data = await response.json()

    return {
      success: true,
      isLive: data.data && data.data.length > 0,
      streamData: data.data && data.data.length > 0 ? data.data[0] : null,
    }
  } catch (error) {
    console.error("Error checking Twitch live status:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to check Twitch live status",
    }
  }
}

/**
 * Extracts a username from a Twitch URL
 * @param url Twitch channel URL
 * @returns Username if found, null otherwise
 */
export function extractTwitchUsername(url: string): string | null {
  // Format: twitch.tv/username
  const usernameRegex = /twitch\.tv\/([a-zA-Z0-9_]+)/i
  const usernameMatch = url.match(usernameRegex)
  if (usernameMatch) return usernameMatch[1]

  return null
}

