export interface Show {
  id: number
  title: string
  description: string
  platform: 'youtube' | 'twitch' | 'instagram' | 'tiktok'
  url: string
  rating: number
  nextShow: string
  isLive: boolean
  channelId?: string
  thumbnailUrl?: string
  videoId?: string
}

export const shows: Show[] = [
  {
    id: 1,
    title: "The Bobby Smith Show",
    description: "Join Bobby Smith as he explores the latest in underground music and emerging artists.",
    platform: "youtube",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 4.5,
    nextShow: "Monday 8:00 PM EST",
    isLive: false,
    channelId: "UC38rXMJNL3RimRnUxWWwrCg"
  },
  {
    id: 2,
    title: "DJ Rhythm's Beat Lab",
    description: "Hip-hop producer DJ Rhythm breaks down the latest tracks and discovers new talent.",
    platform: "twitch",
    url: "https://twitch.tv/djrhythm",
    rating: 4.8,
    nextShow: "Wednesday 9:00 PM EST",
    isLive: true,
    channelId: "djrhythm"
  }
]

export const hosts = {
  1: { 
    name: "Bobby Smith", 
    bio: "Music enthusiast and industry veteran with over 10 years of experience." 
  },
  2: { 
    name: "DJ Rhythm", 
    bio: "Hip-hop producer and radio personality known for discovering new talent." 
  }
}

export const schedules = [
  { day: "Monday", time: "8:00 PM EST" },
  { day: "Wednesday", time: "9:00 PM EST" },
  { day: "Friday", time: "7:30 PM EST" }
]

export const reviews = [
  {
    id: 1,
    showId: 1,
    title: "Great Underground Music Show",
    content: "Bobby always finds the best new artists. Love the show!",
    rating: 5,
    author: "MusicFan123",
    createdAt: "2024-03-15"
  },
  {
    id: 2,
    showId: 2,
    title: "Amazing Beat Breakdowns",
    content: "DJ Rhythm's analysis of beats is incredible. Learning so much!",
    rating: 5,
    author: "BeatMaker99",
    createdAt: "2024-03-16"
  }
] 