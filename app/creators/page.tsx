import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Heart, MessageSquare, Share2, Music, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Creator Portfolio | BangerBoard",
  description: "Showcase your music and connect with reviewers",
}

const portfolioData = {
  creator: {
    name: "Luna Sound",
    username: "@lunasound",
    bio: "Independent artist blending electronic and indie rock. Creating music that tells stories.",
    avatar: "/female-artist.png",
    banner: "/music-studio.png",
    verified: true,
    stats: {
      tracks: 24,
      reviews: 156,
      avgRating: 4.5,
      followers: 8900,
    },
  },
  tracks: [
    {
      id: 1,
      title: "Neon Dreams",
      cover: "/neon-album-art.jpg",
      plays: 45000,
      likes: 2300,
      reviews: 45,
      rating: 4.6,
    },
    {
      id: 2,
      title: "Midnight Echo",
      cover: "/dark-album-art.jpg",
      plays: 38000,
      likes: 1900,
      reviews: 38,
      rating: 4.4,
    },
    {
      id: 3,
      title: "Solar Winds",
      cover: "/space-album-art.jpg",
      plays: 52000,
      likes: 2800,
      reviews: 52,
      rating: 4.7,
    },
  ],
  achievements: [
    { title: "Rising Star", description: "Gained 5K followers in 30 days", icon: TrendingUp },
    { title: "Top Rated", description: "Maintained 4.5+ rating", icon: Award },
    { title: "Community Favorite", description: "100+ positive reviews", icon: Heart },
  ],
}

export default function CreatorsPage() {
  const { creator, tracks, achievements } = portfolioData

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image src={creator.banner || "/placeholder.svg"} alt="Banner" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Profile Section */}
      <div className="container mx-auto px-4 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end mb-8">
          <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-xl">
            <Image src={creator.avatar || "/placeholder.svg"} alt={creator.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-serif tracking-tight">{creator.name}</h1>
              {creator.verified && (
                <Badge variant="secondary">
                  <svg
                    className="h-3 w-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified Artist
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">{creator.bio}</p>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="font-semibold">{creator.stats.tracks}</span>{" "}
                <span className="text-muted-foreground">Tracks</span>
              </div>
              <div>
                <span className="font-semibold">{creator.stats.reviews}</span>{" "}
                <span className="text-muted-foreground">Reviews</span>
              </div>
              <div>
                <span className="font-semibold">{creator.stats.avgRating}</span>{" "}
                <span className="text-muted-foreground">Avg Rating</span>
              </div>
              <div>
                <span className="font-semibold">{creator.stats.followers.toLocaleString()}</span>{" "}
                <span className="text-muted-foreground">Followers</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button>Follow</Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="tracks" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="tracks">Tracks</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="tracks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tracks.map((track) => (
                <Card key={track.id} className="group overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={track.cover || "/placeholder.svg"}
                      alt={track.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="lg" className="rounded-full h-16 w-16 p-0">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif text-lg mb-3">{track.title}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        {(track.plays / 1000).toFixed(0)}K plays
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {(track.likes / 1000).toFixed(1)}K likes
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {track.reviews} reviews
                      </div>
                      <div className="flex items-center gap-1">
                        <Music className="h-3 w-3" />
                        {track.rating} rating
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center p-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4">
                    <achievement.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-serif mb-4">About {creator.name}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{creator.bio}</p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Genre</h4>
                  <div className="flex gap-2 flex-wrap">
                    <Badge>Electronic</Badge>
                    <Badge>Indie Rock</Badge>
                    <Badge>Alternative</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Influences</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Radiohead, Björk, Tame Impala, Grimes</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
