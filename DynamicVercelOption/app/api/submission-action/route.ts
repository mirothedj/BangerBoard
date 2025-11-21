import { NextRequest, NextResponse } from "next/server"
import { sql as vercelSql } from "@vercel/postgres"
import { addShow, Show } from "@/lib/db"
import { verifyActionToken } from "@/lib/auth"

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === "development"

// Use real or mock SQL based on environment
const sql = isDevelopment ? require("@/lib/mock-db").sql : vercelSql

/**
 * API endpoint to handle submission actions (approve/disapprove)
 * Called from email action buttons
 */
export async function GET(request: NextRequest) {
  try {
    // Get action parameters from URL
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get("action")
    const submissionId = searchParams.get("id")
    const token = searchParams.get("token")
    
    // Validate parameters
    if (!action || !submissionId || !token) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameters",
        },
        { status: 400 }
      )
    }

    // Verify action token
    const isValidToken = await verifyActionToken(submissionId, token)
    if (!isValidToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or expired token",
        },
        { status: 401 }
      )
    }

    // Handle different actions
    if (action === "approve") {
      // Get submission details
      const submission = await sql`
        SELECT * FROM submissions WHERE id = ${submissionId}
      `

      if (submission.rowCount === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Submission not found",
          },
          { status: 404 }
        )
      }

      const submissionData = submission.rows[0]

      // Update submission status
      await sql`
        UPDATE submissions 
        SET status = 'approved'
        WHERE id = ${submissionId}
      `

      // Create a show profile if one doesn't exist already
      // First check if show with this URL already exists
      const existingShow = await sql`
        SELECT * FROM shows WHERE url = ${submissionData.url}
      `

      if (existingShow.rowCount === 0 && !isDevelopment) {
        // In non-development mode, create a real show
        const newShow: Omit<Show, "id"> = {
          title: `New ${submissionData.platform.charAt(0).toUpperCase() + submissionData.platform.slice(1)} Show`,
          description: `Approved show profile from ${submissionData.url}`,
          platform: submissionData.platform,
          url: submissionData.url,
          thumbnail: "/placeholder.svg?height=400&width=400",
          rating: 3, // Default middle rating
          nextShow: "TBD",
          isLive: false,
          lastUpdated: new Date().toISOString(),
          reviewContent: "",
          artistsReviewed: [],
          viewCount: 0,
          engagementRate: 0
        }

        // Add the new show to the database
        await addShow(newShow)
      }

      return NextResponse.json({
        success: true,
        message: "Submission approved successfully",
      })
    } else if (action === "disapprove") {
      // Delete the submission
      await sql`
        DELETE FROM submissions WHERE id = ${submissionId}
      `

      return NextResponse.json({
        success: true,
        message: "Submission disapproved and removed",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid action",
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error("Error handling submission action:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
