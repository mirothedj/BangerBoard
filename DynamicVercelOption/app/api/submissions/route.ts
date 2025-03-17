import { NextResponse } from "next/server"
import { sql as vercelSql } from "@vercel/postgres"

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === "development"

// Use real or mock SQL based on environment
const sql = isDevelopment ? require("@/lib/mock-db").sql : vercelSql

export async function GET() {
  try {
    // Query all submissions from the database
    const result = await sql`
      SELECT * FROM submissions
      ORDER BY submitted_at DESC
    `

    return NextResponse.json({
      success: true,
      submissions: result.rows,
    })
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
} 