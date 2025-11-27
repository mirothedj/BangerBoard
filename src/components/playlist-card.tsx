import { Card, CardContent } from "@/components/ui/card"
import { Music, Users } from "lucide-react"

interface PlaylistCardProps {
  playlist: {
    _id: string
    title: string
    description: string
    coverImage: string
    genre: string
    showCount: number
    followerCount: number
  }
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-all cursor-pointer">
      <div className="relative aspect-square">
        <img
          src={playlist.coverImage || "/placeholder.svg"}
          alt={playlist.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-1">{playlist.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{playlist.description}</p>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Music className="h-3 w-3" />
            <span>{playlist.showCount} shows</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{playlist.followerCount.toLocaleString()} followers</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
