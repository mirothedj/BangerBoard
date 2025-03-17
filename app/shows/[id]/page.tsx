import { shows } from "@/lib/data"
import ShowDetails from "./show-details"

// Generate static paths for all shows
export async function generateStaticParams() {
  return shows.map((show) => ({
    id: show.id.toString(),
  }))
}

export default function ShowPage({ params }: { params: { id: string } }) {
  const show = shows.find((s) => s.id === Number(params.id))

  if (!show) {
    return null
  }

  return <ShowDetails show={show} />
}

