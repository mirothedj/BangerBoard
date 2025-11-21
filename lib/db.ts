// Enhanced database with comprehensive mock data

export interface Show {
  id: number
  title: string
  description: string
  platform: string
  url: string
  channelId?: string
  thumbnail: string
  videoId?: string
  rating: number
  nextShow: string
  isLive: boolean
  lastUpdated?: string
  reviewContent?: string
  artistsReviewed?: string[]
  viewCount?: number
  engagementRate?: number
  hostId?: number
}

export interface Review {
  id: number
  showId: number
  artistName: string
  songTitle?: string
  albumTitle?: string
  reviewContent: string
  rating: number
  timestamp: string
  url: string
  hostResponse?: string
  hostResponseTimestamp?: string
  likes: number
  dislikes: number
  isVerified: boolean
}

export interface Host {
  id: number
  name: string
  bio: string
  avatar: string
  socialLinks: {
    youtube?: string
    twitch?: string
    instagram?: string
    tiktok?: string
  }
  verified: boolean
  totalReviews: number
  avgRating: number
  joinedDate: string
}

// Enhanced mock hosts
const HOSTS: Host[] = [
  {
    id: 1,
    name: "Bobby Everything",
    bio: "Music industry veteran with 15+ years of experience. Known for honest, in-depth reviews and discovering underground talent.",
    avatar: "/placeholder.svg?height=150&width=150",
    socialLinks: {
      youtube: "UCrXzMVbjcaVvVtihxNpBvMQ",
      instagram: "bobbyeverything",
      twitter: "bobbyeverything",
    },
    verified: true,
    totalReviews: 1247,
    avgRating: 4.8,
    joinedDate: "2019-03-15",
  },
  {
    id: 2,
    name: "DJ Rhythm",
    bio: "Hip-hop producer and radio personality. Specializes in underground rap and emerging artists from the South.",
    avatar: "/placeholder.svg?height=150&width=150",
    socialLinks: {
      youtube: "UCnQ0T9b3q-WlKtEOkpnQprg",
      twitch: "djrhythm",
      instagram: "djrhythm",
    },
    verified: true,
    totalReviews: 892,
    avgRating: 4.6,
    joinedDate: "2020-01-22",
  },
  {
    id: 3,
    name: "G.Trill",
    bio: "Quick-fire reviews and industry insights. Breaking down the hottest tracks in under 60 seconds.",
    avatar: "/placeholder.svg?height=150&width=150",
    socialLinks: {
      tiktok: "g.trill",
      instagram: "gtrill_official",
    },
    verified: true,
    totalReviews: 2156,
    avgRating: 4.4,
    joinedDate: "2021-06-10",
  },
]

// Enhanced shows with proper URLs and host associations
let SHOWS: Show[] = [
  {
    id: 1,
    title: "Bobby Everything",
    description:
      "Weekly deep-dive music reviews covering all genres. Known for discovering breakthrough artists before they hit mainstream.",
    platform: "youtube",
    url: "https://youtube.com/@bobbyeverything",
    channelId: "UCrXzMVbjcaVvVtihxNpBvMQ",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    videoId: "dQw4w9WgXcQ",
    rating: 4.8,
    nextShow: "Today at 8:00 PM EST",
    isLive: true,
    lastUpdated: new Date().toISOString(),
    hostId: 1,
    viewCount: 125000,
    engagementRate: 8.5,
  },
  {
    id: 2,
    title: "Stay On Beat Live",
    description: "Hip-hop reviews and producer feedback. Live reactions to new releases and artist interviews.",
    platform: "youtube",
    url: "https://youtube.com/@stayonbeatlive",
    channelId: "UCnQ0T9b3q-WlKtEOkpnQprg",
    thumbnail: "https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg",
    videoId: "jNQXAC9IVRw",
    rating: 4.6,
    nextShow: "Tomorrow at 7:00 PM EST",
    isLive: false,
    hostId: 2,
    viewCount: 89000,
    engagementRate: 7.2,
  },
  {
    id: 3,
    title: "G.Trill Quick Reviews",
    description: "60-second music reviews that get straight to the point. Covering the hottest new releases daily.",
    platform: "tiktok",
    url: "https://www.tiktok.com/@g.trill",
    thumbnail: "/placeholder.svg?height=400&width=400",
    rating: 4.4,
    nextShow: "Daily at 6:00 PM EST",
    isLive: false,
    hostId: 3,
    viewCount: 2100000,
    engagementRate: 12.8,
  },
  {
    id: 7,
    title: "DJ Rhythm Live Mix",
    description: "Southern hip-hop vibes with exclusive artist interviews and beat breakdowns.",
    platform: "twitch",
    url: "https://twitch.tv/djrhythm",
    thumbnail: "/placeholder.svg?height=400&width=400",
    videoId: "M7lc1UVf-VE",
    rating: 4.9,
    nextShow: "Now Live",
    isLive: true,
    hostId: 2,
    viewCount: 45000,
    engagementRate: 11.2,
  },
  {
    id: 8,
    title: "Underground Vibes Radio",
    description: "Discovering tomorrow's stars today. Live performances and exclusive premieres.",
    platform: "youtube",
    url: "https://youtube.com/@undergroundvibes",
    thumbnail: "/placeholder.svg?height=400&width=400",
    videoId: "9bZkp7q19f0",
    rating: 4.7,
    nextShow: "Live Now",
    isLive: true,
    hostId: 2,
    viewCount: 67000,
    engagementRate: 9.8,
  },
  {
    id: 4,
    title: "J Smoov Official",
    description: "R&B and soul music reviews with a focus on vocal performance and production quality.",
    platform: "tiktok",
    url: "https://www.tiktok.com/@jsmoovofficial",
    thumbnail: "/placeholder.svg?height=400&width=400",
    rating: 4.2,
    nextShow: "Saturday at 6:00 PM EST",
    isLive: false,
    viewCount: 450000,
    engagementRate: 9.1,
  },
  {
    id: 5,
    title: "Rap 101 Economics",
    description:
      "Breaking down the business side of music while reviewing the artistic merit. Industry insights included.",
    platform: "instagram",
    url: "https://www.instagram.com/rap101economics",
    thumbnail: "/placeholder.svg?height=400&width=400",
    rating: 4.7,
    nextShow: "Sunday at 3:00 PM EST",
    isLive: false,
    viewCount: 78000,
    engagementRate: 6.8,
  },
  {
    id: 6,
    title: "Unsigned Talent Search",
    description: "Dedicated to showcasing and reviewing unsigned artists. Helping new talent get discovered.",
    platform: "instagram",
    url: "https://www.instagram.com/unsignedtalentsearch",
    thumbnail: "/placeholder.svg?height=400&width=400",
    rating: 4.1,
    nextShow: "Monday at 7:00 PM EST",
    isLive: false,
    viewCount: 34000,
    engagementRate: 5.9,
  },
]

// Comprehensive reviews with host responses
const REVIEWS: Review[] = [
  {
    id: 1,
    showId: 1,
    artistName: "Kendrick Lamar",
    songTitle: "HUMBLE.",
    albumTitle: "DAMN.",
    reviewContent:
      "This track showcases Kendrick's incredible ability to blend conscious rap with mainstream appeal. The production by Mike WiLL Made-It is minimalist yet powerful, allowing Kendrick's flow and message to take center stage. The video direction perfectly complements the song's themes of humility vs. pride. This is hip-hop at its finest - accessible but never dumbed down.",
    rating: 5,
    timestamp: "2023-12-15T14:30:00Z",
    url: "https://youtube.com/watch?v=example1",
    hostResponse:
      "Thanks for watching! I'm glad you all appreciated the breakdown of the production elements. Mike WiLL Made-It really outdid himself on this one. What other Kendrick tracks would you like me to review?",
    hostResponseTimestamp: "2023-12-15T16:45:00Z",
    likes: 1247,
    dislikes: 23,
    isVerified: true,
  },
  {
    id: 2,
    showId: 1,
    artistName: "Tyler, The Creator",
    songTitle: "EARFQUAKE",
    albumTitle: "IGOR",
    reviewContent:
      "Tyler's evolution as an artist is on full display here. The vulnerability in his vocals, combined with the lush production and unexpected chord progressions, creates something truly special. This isn't just rap - it's art. The way he manipulates his voice throughout the track shows incredible growth from his earlier work.",
    rating: 4,
    timestamp: "2023-12-10T19:20:00Z",
    url: "https://youtube.com/watch?v=example2",
    hostResponse:
      "IGOR was such a game-changer for Tyler. The whole album deserves multiple listens. Planning to do a full album review soon!",
    hostResponseTimestamp: "2023-12-10T20:15:00Z",
    likes: 892,
    dislikes: 45,
    isVerified: true,
  },
  {
    id: 3,
    showId: 2,
    artistName: "J. Cole",
    songTitle: "No Role Modelz",
    albumTitle: "2014 Forest Hills Drive",
    reviewContent:
      "Cole's storytelling ability shines through on this track. The beat switch halfway through keeps you engaged, and his flow adapts perfectly to each section. The message about self-reliance and not idolizing others is delivered without being preachy. This is why J. Cole is considered one of the best lyricists of this generation.",
    rating: 5,
    timestamp: "2023-11-28T21:10:00Z",
    url: "https://youtube.com/watch?v=example3",
    hostResponse:
      "J. Cole never misses when it comes to storytelling. That beat switch still gives me chills every time. What's your favorite Cole track?",
    hostResponseTimestamp: "2023-11-28T22:30:00Z",
    likes: 1456,
    dislikes: 12,
    isVerified: true,
  },
  {
    id: 4,
    showId: 3,
    artistName: "Doja Cat",
    songTitle: "Paint The Town Red",
    reviewContent:
      "Doja's versatility is unmatched! This track samples Dionne Warwick perfectly and shows her range. The production is clean, her flow is effortless, and the hook is infectious. She continues to prove she's not just a viral sensation but a legitimate artist.",
    rating: 4,
    timestamp: "2023-12-01T18:45:00Z",
    url: "https://tiktok.com/@g.trill/video/example4",
    hostResponse:
      "Doja really knows how to pick samples! The Dionne Warwick flip was genius. More reviews coming tomorrow!",
    hostResponseTimestamp: "2023-12-01T19:20:00Z",
    likes: 3247,
    dislikes: 156,
    isVerified: true,
  },
  {
    id: 5,
    showId: 1,
    artistName: "SZA",
    songTitle: "Good Days",
    reviewContent:
      "SZA's vocal performance on this track is absolutely stunning. The way she effortlessly transitions between her chest voice and falsetto creates this dreamy, ethereal atmosphere. The production by Carter Lang and Nascent perfectly complements her vocals without overwhelming them. This is R&B at its most pure and emotional.",
    rating: 5,
    timestamp: "2023-11-20T16:30:00Z",
    url: "https://youtube.com/watch?v=example5",
    hostResponse:
      "SZA's voice is truly a gift. The way she conveys emotion through her vocal delivery is unparalleled. Definitely one of the best R&B artists of our time.",
    hostResponseTimestamp: "2023-11-20T17:45:00Z",
    likes: 2134,
    dislikes: 34,
    isVerified: true,
  },
]

// Database functions
export async function getShows(): Promise<Show[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return SHOWS
}

export async function getShowById(id: number): Promise<Show | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return SHOWS.find((show) => show.id === id) || null
}

export async function getHostById(id: number): Promise<Host | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return HOSTS.find((host) => host.id === id) || null
}

export async function updateShowThumbnail(showId: number, thumbnailUrl: string, videoId?: string): Promise<void> {
  SHOWS = SHOWS.map((show) =>
    show.id === showId ? { ...show, thumbnail: thumbnailUrl, videoId: videoId || show.videoId } : show,
  )
  console.log(`Updated thumbnail for show ${showId} to ${thumbnailUrl} with videoId ${videoId}`)
}

export async function addShow(show: Omit<Show, "id">): Promise<Show> {
  const newId = Math.max(...SHOWS.map((s) => s.id)) + 1
  const newShow = { ...show, id: newId }
  SHOWS.push(newShow)
  return newShow
}

export async function getReviews(): Promise<Review[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return REVIEWS
}

export async function getReviewsByShowId(showId: number): Promise<Review[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return REVIEWS.filter((review) => review.showId === showId)
}

export async function getReviewsByArtist(artistName: string): Promise<Review[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return REVIEWS.filter((review) => review.artistName.toLowerCase().includes(artistName.toLowerCase()))
}

export async function addReview(review: Omit<Review, "id">): Promise<Review> {
  const newId = Math.max(...REVIEWS.map((r) => r.id), 0) + 1
  const newReview = { ...review, id: newId }
  REVIEWS.push(newReview)
  return newReview
}

export async function updateShowWithScrapedData(showId: number, data: Partial<Show>): Promise<Show | null> {
  const showIndex = SHOWS.findIndex((show) => show.id === showId)
  if (showIndex === -1) return null

  SHOWS[showIndex] = {
    ...SHOWS[showIndex],
    ...data,
    lastUpdated: new Date().toISOString(),
  }

  return SHOWS[showIndex]
}
