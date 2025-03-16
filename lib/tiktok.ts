// TikTok API utility functions
// Note: TikTok's API has limitations and requires developer account
// This is a simplified version that would need to be expanded in a real application

/**
 * Gets basic information about a TikTok account
 * @param username TikTok username
 * @param accessToken TikTok API access token
 * @returns Account information
 */
export async function getTikTokAccountInfo(username: string, accessToken: string) {
  try {
    // In a real implementation, you would use the TikTok API
    // This is a placeholder for demonstration purposes

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return mock data
    return {
      success: true,
      username,
      nickname: `${username.charAt(0).toUpperCase()}${username.slice(1)}`,
      bio: `Music reviewer 🎵 | Sharing honest opinions on the latest tracks | DM for review requests`,
      followersCount: Math.floor(Math.random() * 100000) + 5000,
      followingCount: Math.floor(Math.random() * 1000) + 100,
      likesCount: Math.floor(Math.random() * 1000000) + 10000,
      profilePictureUrl: `/placeholder.svg?height=150&width=150`,
      isVerified: Math.random() > 0.7,
    }
  } catch (error) {
    console.error("Error fetching TikTok account info:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch TikTok account data",
    }
  }
}

/**
 * Gets recent videos from a TikTok account
 * @param username TikTok username
 * @param accessToken TikTok API access token
 * @returns List of recent videos
 */
export async function getTikTokRecentVideos(username: string, accessToken: string) {
  try {
    // In a real implementation, you would use the TikTok API
    // This is a placeholder for demonstration purposes

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Generate mock videos with music review content
    const videos = Array.from({ length: 10 }, (_, i) => {
      const artists = [
        "Drake",
        "Taylor Swift",
        "Kendrick Lamar",
        "Billie Eilish",
        "The Weeknd",
        "Ariana Grande",
        "Tyler, The Creator",
        "Doja Cat",
        "Bad Bunny",
        "SZA",
        "Lil Uzi Vert",
        "Olivia Rodrigo",
      ]
      const artist = artists[Math.floor(Math.random() * artists.length)]

      const isMusicReview = Math.random() > 0.3
      const description = isMusicReview
        ? `Is ${artist}'s new album worth the hype? Here's my honest review 🎵 #MusicReview #${artist.replace(/\s+/g, "")}`
        : `New content dropping soon! #MusicTok #Creator`

      return {
        id: `video_${i + 1}`,
        description,
        videoUrl: `https://tiktok.com/@${username}/video/mock${i + 1}`,
        coverUrl: `/placeholder.svg?height=640&width=360`,
        shareUrl: `https://tiktok.com/@${username}/video/mock${i + 1}`,
        createTime: new Date(Date.now() - i * 86400000).toISOString(),
        likesCount: Math.floor(Math.random() * 10000) + 500,
        commentsCount: Math.floor(Math.random() * 500) + 50,
        sharesCount: Math.floor(Math.random() * 1000) + 100,
        viewCount: Math.floor(Math.random() * 50000) + 1000,
        isMusicReview,
        artistName: isMusicReview ? artist : null,
      }
    })

    // Filter to only include music reviews
    const musicReviews = videos.filter((video) => video.isMusicReview)

    return {
      success: true,
      videos: musicReviews,
      allVideos: videos,
    }
  } catch (error) {
    console.error("Error fetching TikTok videos:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch TikTok videos",
    }
  }
}

/**
 * Extracts a username from a TikTok URL
 * @param url TikTok profile URL
 * @returns Username if found, null otherwise
 */
export function extractTikTokUsername(url: string): string | null {
  // Format: tiktok.com/@username
  const usernameRegex = /tiktok\.com\/@([a-zA-Z0-9._]+)\/?/i
  const usernameMatch = url.match(usernameRegex)
  if (usernameMatch) return usernameMatch[1]

  return null
}

