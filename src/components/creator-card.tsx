import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, FileText } from "lucide-react"

interface CreatorCardProps {
  creator: {
    _id: string
    name: string
    avatar: string
    bio: string
    genre: string
    submissionCount: number
    followerCount: number
    featured: boolean
  }
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <Card className="hover:border-primary/50 transition-all cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
            <AvatarFallback>{creator.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{creator.name}</h3>
              {creator.featured && <Badge className="text-xs">Featured</Badge>}
            </div>
            <Badge variant="outline" className="text-xs mt-1">
              {creator.genre}
            </Badge>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{creator.bio}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>{creator.submissionCount} submissions</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{creator.followerCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
