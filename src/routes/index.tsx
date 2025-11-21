import { createFileRoute } from "@tanstack/react-router"
import { LiveShowsBar } from "@/components/live-shows-bar"
import { HorizontalScrollShows } from "@/components/horizontal-scroll-shows"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="space-y-8 pb-12">
      <LiveShowsBar />
      <div className="space-y-8 px-4">
        <HorizontalScrollShows title="Trending Shows" direction="left" />
        <HorizontalScrollShows title="Popular This Week" direction="right" />
      </div>
    </div>
  )
}
