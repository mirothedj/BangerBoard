import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { useConvexAuth, useQuery as useConvexQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  // Using Convex for real-time data
  const liveShows = useConvexQuery(api.shows.getLiveShows) || []
  const { isLoading } = useConvexAuth()

  // Example of TanStack Query integration (e.g., for external API data)
  const { data: trendingData } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      // Simulating external fetch
      return [
        { id: 1, title: "Midnight Mix", artist: "DJ Sol", viewers: 1200 },
        { id: 2, title: "Tech Talk Live", artist: "DevSquad", viewers: 850 },
        { id: 3, title: "Chill Lo-Fi", artist: "BeatsByDre", viewers: 3000 },
      ]
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl neo-raised p-8 md:p-12">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-primary neo-inset">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live Now
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight neo-text">
            Experience Music <br /> Like Never Before
          </h1>
          <p className="text-lg text-muted-foreground">
            Join thousands of listeners in real-time interactive music sessions. Connect with artists, chat with fans,
            and feel the vibe.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-3 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95">
              Start Listening
            </button>
            <button className="px-8 py-3 rounded-xl font-semibold neo-raised hover:neo-flat transition-all active:scale-95">
              Browse Shows
            </button>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      </section>

      {/* Live Shows Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold neo-text">Trending Live</h2>
          <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(liveShows.length > 0 ? liveShows : trendingData || []).map((show: any, i: number) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl neo-raised hover:neo-flat transition-all duration-300"
            >
              <div className="aspect-video bg-muted relative">
                {/* Fallback for image */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>
                {show.thumbnailUrl && (
                  <img
                    src={show.thumbnailUrl || "/placeholder.svg"}
                    alt={show.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-xs font-bold text-white bg-red-500/90 backdrop-blur-sm rounded-md shadow-lg shadow-red-500/20 animate-pulse">
                    LIVE
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold leading-tight mb-1 group-hover:text-primary transition-colors">
                  {show.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{show.artist || "Unknown Artist"}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
                    {show.viewers || 0} watching
                  </div>
                  <button className="p-2 rounded-full neo-raised hover:neo-flat text-primary transition-all active:scale-90">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
