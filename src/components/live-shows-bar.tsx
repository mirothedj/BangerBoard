import { useQuery } from "@/lib/mock-convex"
import { api } from "../../convex/_generated/api"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function LiveShowsBar() {
  const liveShows = useQuery(api.shows.getLiveShows)

  if (!liveShows || liveShows.length === 0) return null

  return (
    <div className="border-b border-border/40 bg-card/50 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="destructive" className="animate-pulse">
            LIVE NOW
          </Badge>
          <span className="text-sm text-muted-foreground">{liveShows.length} shows streaming</span>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4">
            {liveShows.map((show: any) => (
              <Card
                key={show._id}
                className="flex-none w-48 h-28 overflow-hidden cursor-pointer group relative border-primary/50 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all"
              >
                <img
                  src={show.thumbnailUrl || "/placeholder.svg?height=112&width=192"}
                  alt={show.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 flex flex-col justify-end">
                  <p className="text-xs font-semibold line-clamp-1 text-white">{show.title}</p>
                  <div className="flex items-center gap-1 text-xs text-white/80">
                    <Eye className="h-3 w-3" />
                    <span>{show.viewCount.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
