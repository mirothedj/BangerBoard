import { NextResponse } from "next/server"
import { scrapeAllShows } from "@/app/actions/shows"

// This endpoint can be called by a cron job (e.g., Vercel Cron)
// to scrape content from all shows on a schedule
export async function GET() {
  try {
    const result = await scrapeAllShows()

    return NextResponse.json(result)
  } catch (error) {
    console.error("Cron job error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

