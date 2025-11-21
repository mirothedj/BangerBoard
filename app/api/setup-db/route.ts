import { NextResponse } from "next/server"
import { setupDatabase } from "@/lib/db-setup"

// This endpoint can be called to set up the database tables
export async function GET() {
  try {
    const result = await setupDatabase()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Database setup completed successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Unknown error during database setup",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in setup-db route:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
