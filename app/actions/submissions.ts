"use server"

import { revalidatePath } from "next/cache"
import { sql as vercelSql } from "@vercel/postgres"
import { addShow, Show } from "@/lib/db"
import { checkUrlContentMeetsCriteria } from "@/lib/content-checker"
import { sendApprovalEmail } from "@/lib/email"
import { hashUrl } from "@/lib/auth"

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === "development"

// Use real or mock SQL based on environment
const sql = isDevelopment ? require("@/lib/mock-db").sql : vercelSql

export interface SubmissionData {
  url: string
  platform: string
  submittedAt: Date
  status: "pending" | "approved" | "rejected" | "hold_for_review"
  meetsCriteria?: boolean
}

export async function submitResource(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    // Extract data from form
    const url = formData.get("url") as string

    if (!url) {
      return { success: false, message: "URL is required" }
    }

    // Determine platform from URL
    let platform = "unknown"
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      platform = "youtube"
    } else if (url.includes("twitch.tv")) {
      platform = "twitch"
    } else if (url.includes("instagram.com")) {
      platform = "instagram"
    } else if (url.includes("tiktok.com")) {
      platform = "tiktok"
    } else {
      return {
        success: false,
        message: "Please enter a valid YouTube, Twitch, Instagram, or TikTok URL",
      }
    }

    // Check for duplicate submissions
    const urlHash = hashUrl(url)
    const existingSubmission = await sql`
      SELECT * FROM submissions 
      WHERE url = ${url}
    `

    // If this URL has already been submitted, return a message
    if (existingSubmission.rowCount > 0) {
      const submissionStatus = existingSubmission.rows[0].status
      
      if (submissionStatus === 'approved') {
        return {
          success: true,
          message: "This URL has already been approved and added to our database.",
        }
      } else if (submissionStatus === 'hold_for_review') {
        return {
          success: true,
          message: "This URL has already been submitted and is awaiting review by our team.",
        }
      } else if (submissionStatus === 'pending') {
        return {
          success: true,
          message: "This URL has already been submitted and is being processed.",
        }
      } else {
        return {
          success: true,
          message: "This URL has already been submitted before.",
        }
      }
    }

    // Check if the URL's content meets the criteria
    const contentCheck = await checkUrlContentMeetsCriteria(url, platform)
    const status = contentCheck.meetsCriteria ? "pending" : "hold_for_review"

    // Insert into submissions database
    const insertResult = await sql`
      INSERT INTO submissions (url, platform, submitted_at, status, meets_criteria)
      VALUES (${url}, ${platform}, ${new Date().toISOString()}, ${status}, ${contentCheck.meetsCriteria})
      RETURNING id
    `
    
    // Get the submission ID for email notifications
    const submissionId = insertResult.rows[0]?.id?.toString()

    // If the content meets criteria, automatically create a show profile
    if (contentCheck.meetsCriteria) {
      // Create a new show with default values
      const newShow: Omit<Show, "id"> = {
        title: contentCheck.title || `New ${platform.charAt(0).toUpperCase() + platform.slice(1)} Show`,
        description: contentCheck.description || `Automatically created show profile from ${url}`,
        platform,
        url,
        channelId: contentCheck.channelId || undefined,
        thumbnail: contentCheck.thumbnail || "/placeholder.svg?height=400&width=400",
        rating: 3, // Default middle rating
        nextShow: "TBD",
        isLive: false,
        lastUpdated: new Date().toISOString(),
        reviewContent: "",
        artistsReviewed: [],
        viewCount: contentCheck.viewCount || 0,
        engagementRate: 0
      }

      // Add the new show to the database
      await addShow(newShow)
    } else {
      // Send an email for review since it doesn't meet criteria
      await sendApprovalEmail({
        id: submissionId,
        url,
        platform,
        submittedAt: new Date(),
        reason: "Content did not match required criteria",
        contentSnippet: contentCheck.contentSnippet || "No content available"
      })
    }

    // Revalidate the home page to show updated data
    revalidatePath("/")

    return {
      success: true,
      message: contentCheck.meetsCriteria
        ? "Your submission has been received and a profile has been created."
        : "Your submission has been received and will be reviewed by our team.",
    }
  } catch (error) {
    console.error("Error submitting resource:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit resource",
    }
  }
}

