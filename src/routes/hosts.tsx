import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@/lib/mock-convex"
import { api } from "../../convex/_generated/api"
import { HostCard } from "@/components/host-card"
import { Loader2 } from "lucide-react"

export const Route = createFileRoute("/hosts")({
  component: HostsPage,
})

function HostsPage() {
  const hosts = useQuery(api.hosts.list)

  if (!hosts) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Hosts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hosts.map((host: any) => (
          <HostCard key={host._id} host={host} />
        ))}
      </div>
    </div>
  )
}
