import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Eye, ThumbsUp, Star } from "lucide-react"

interface ShowCardProps {
  show: {
    _id: string
    title: string
    hostName: string
    hostAvatar?: string
    videoUrl: string
    thumbnailUrl?: string
    viewCount: number
    likeCount: number
    rating: number
    genre: string
    isLive: boolean
  }
}

export function ShowCard({ show }: ShowCardProps) {
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-all">
      <div className="relative aspect-video">
        <img
          src={show.thumbnailUrl || "/placeholder.svg?height=180&width=320"}
          alt={show.title}
          className="w-full h-full object-cover"
        />
        {show.isLive && (
          <Badge variant="destructive" className="absolute top-2 right-2 animate-pulse">
            LIVE
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={show.hostAvatar || "/placeholder.svg"} alt={show.hostName} />
            <AvatarFallback>{show.hostName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold line-clamp-2 text-sm">{show.title}</h3>
            <p className="text-xs text-muted-foreground">{show.hostName}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{show.viewCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" />
                <span>{show.likeCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span>{show.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
