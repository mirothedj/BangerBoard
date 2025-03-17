import { NextResponse } from "next/server"
import { scrapeShow } from "@/app/actions/shows"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const showId = Number.parseInt(params.id, 10)

    if (isNaN(showId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid show ID",
        },
        { status: 400 },
      )
    }

    const result = await scrapeShow(showId)

    return NextResponse.json(result)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

