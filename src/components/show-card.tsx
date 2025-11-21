import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, ThumbsUp, Star, Play, Share2, Heart } from "lucide-react"

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
    <div className="group relative rounded-2xl overflow-hidden neo-raised hover:neo-subtle transition-all duration-300 bg-card">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={show.thumbnailUrl || "/placeholder.svg?height=180&width=320"}
          alt={show.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {show.isLive && (
          <Badge
            variant="destructive"
            className="absolute top-2 right-2 animate-pulse shadow-lg shadow-red-500/20 z-10"
          >
            LIVE
          </Badge>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full h-10 w-10 neo-raised hover:scale-110 transition-transform"
          >
            <Play className="h-4 w-4 fill-current" />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full h-10 w-10 hover:bg-white/20 text-white">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full h-10 w-10 hover:bg-white/20 text-white">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 neo-inset border-2 border-background">
            <AvatarImage src={show.hostAvatar || "/placeholder.svg"} alt={show.hostName} />
            <AvatarFallback>{show.hostName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
              {show.title}
            </h3>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">{show.hostName}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{show.viewCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              <span>{show.likeCount.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
            <Star className="h-3 w-3 fill-current" />
            <span>{show.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
