import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Youtube, Twitch, Instagram, Users, Calendar, Star } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Hosts | BangerBoard",
  description: "Discover music review show hosts and creators",
}

const hosts = [
  {
    id: 1,
    name: "Alex Rivers",
    username: "@alexrivers",
    bio: "Rock and metal music critic with 10+ years experience. Passionate about discovering new talent.",
    avatar: "/music-critic-male.jpg",
    verified: true,
    followers: 125000,
    shows: 342,
    rating: 4.8,
    platforms: ["youtube", "twitch"],
    specialties: ["Rock", "Metal", "Alternative"],
  },
  {
    id: 2,
    name: "Maya Chen",
    username: "@mayamusic",
    bio: "Hip-hop and R&B enthusiast. Bringing authentic voices to the forefront of music criticism.",
    avatar: "/music-critic-female.jpg",
    verified: true,
    followers: 89000,
    shows: 278,
    rating: 4.9,
    platforms: ["youtube", "instagram"],
    specialties: ["Hip-Hop", "R&B", "Soul"],
  },
  {
    id: 3,
    name: "DJ Marcus",
    username: "@djmarcus",
    bio: "Electronic and dance music specialist. Live mixing and real-time reviews.",
    avatar: "/dj-male.jpg",
    verified: true,
    followers: 156000,
    shows: 421,
    rating: 4.7,
    platforms: ["twitch", "youtube"],
    specialties: ["EDM", "House", "Techno"],
  },
  {
    id: 4,
    name: "Sarah Mitchell",
    username: "@sarahsounds",
    bio: "Indie and alternative music curator. Supporting emerging artists worldwide.",
    avatar: "/music-blogger-female.jpg",
    verified: false,
    followers: 42000,
    shows: 156,
    rating: 4.6,
    platforms: ["youtube"],
    specialties: ["Indie", "Alternative", "Folk"],
  },
]

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "youtube":
      return <Youtube className="h-4 w-4" />
    case "twitch":
      return <Twitch className="h-4 w-4" />
    case "instagram":
      return <Instagram className="h-4 w-4" />
    default:
      return null
  }
}

export default function HostsPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-serif tracking-tight mb-4">Featured Hosts</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Meet the passionate music critics and show hosts shaping the conversation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hosts.map((host) => (
          <Card key={host.id} className="overflow-hidden hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={host.avatar || "/placeholder.svg"} alt={host.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-xl font-serif">{host.name}</CardTitle>
                    {host.verified && (
                      <Badge variant="secondary" className="h-5">
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
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm">{host.username}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{host.bio}</p>

              <div className="flex flex-wrap gap-2">
                {host.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm font-medium mb-1">
                    <Users className="h-4 w-4" />
                    {(host.followers / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm font-medium mb-1">
                    <Calendar className="h-4 w-4" />
                    {host.shows}
                  </div>
                  <div className="text-xs text-muted-foreground">Shows</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm font-medium mb-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    {host.rating}
                  </div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {host.platforms.map((platform) => (
                    <Button key={platform} variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                      <PlatformIcon platform={platform} />
                    </Button>
                  ))}
                </div>
                <Button>Follow</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
