import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Video } from "lucide-react"

interface HostCardProps {
  host: {
    _id: string
    name: string
    avatar: string
    bio: string
    verified: boolean
    showCount: number
    followerCount: number
    rating: number
  }
}

export function HostCard({ host }: HostCardProps) {
  return (
    <Card className="hover:border-primary/50 transition-all cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={host.avatar || "/placeholder.svg"} alt={host.name} />
            <AvatarFallback>{host.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{host.name}</h3>
              {host.verified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{host.bio}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Video className="h-3 w-3" />
                <span>{host.showCount} shows</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{host.followerCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span>{host.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
