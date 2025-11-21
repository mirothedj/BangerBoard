import type { Metadata } from "next"
import { Music, PlayCircle, Clock, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Playlists | BangerBoard",
  description: "Curated music playlists from top shows and hosts",
}

const playlists = [
  {
    id: 1,
    title: "Best of Rock 2024",
    description: "Top rock performances reviewed this year",
    curator: "Rock Review Show",
    trackCount: 45,
    duration: "3h 24m",
    thumbnail: "/rock-music.jpg",
    plays: 12500,
  },
  {
    id: 2,
    title: "Hip-Hop Heat",
    description: "Hottest hip-hop tracks and live performances",
    curator: "Urban Vibes",
    trackCount: 38,
    duration: "2h 51m",
    thumbnail: "/hip-hop.jpg",
    plays: 8900,
  },
  {
    id: 3,
    title: "Indie Discoveries",
    description: "Hidden gems from emerging indie artists",
    curator: "The Indie Hour",
    trackCount: 52,
    duration: "4h 12m",
    thumbnail: "/indie-music-scene.png",
    plays: 15200,
  },
  {
    id: 4,
    title: "Electronic Fusion",
    description: "Best electronic and experimental music",
    curator: "Beat Lab",
    trackCount: 41,
    duration: "3h 35m",
    thumbnail: "/electronic-music.jpg",
    plays: 9700,
  },
]

export default function PlaylistsPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-serif tracking-tight mb-4">Curated Playlists</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Discover handpicked collections from our community of music reviewers and hosts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className="group cursor-pointer overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={playlist.thumbnail || "/placeholder.svg"}
                alt={playlist.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <Button
                size="lg"
                className="absolute bottom-4 right-4 rounded-full h-14 w-14 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <PlayCircle className="h-6 w-6" />
              </Button>
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-serif">{playlist.title}</CardTitle>
              <CardDescription className="line-clamp-2 leading-relaxed">{playlist.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Music className="h-4 w-4" />
                  <span>{playlist.curator}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <PlayCircle className="h-4 w-4" />
                    <span>{playlist.trackCount} tracks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{playlist.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{playlist.plays.toLocaleString()} plays</span>
                  </div>
                  <Badge variant="secondary">Curated</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
