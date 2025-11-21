"use server"

import { revalidatePath } from "next/cache"
import { sql } from "@vercel/postgres"

export interface SubmissionData {
  url: string
  platform: string
  submittedAt: Date
  status: "pending" | "approved" | "rejected"
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

    // Insert into database
    await sql`
      INSERT INTO submissions (url, platform, submitted_at, status)
      VALUES (${url}, ${platform}, ${new Date().toISOString()}, ${"pending"})
    `

    // Revalidate the home page to show updated data
    revalidatePath("/")

    return {
      success: true,
      message: "Your submission has been received and will be reviewed.",
    }
  } catch (error) {
    console.error("Error submitting resource:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit resource",
    }
  }
}
