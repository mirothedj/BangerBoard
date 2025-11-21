"use server"

import { sql } from "@vercel/postgres"

export async function setupDatabase() {
  try {
    // Create submissions table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        platform TEXT NOT NULL,
        submitted_at TIMESTAMP NOT NULL,
        status TEXT NOT NULL
      )
    `

    console.log("Database setup completed successfully")
    return { success: true }
  } catch (error) {
    console.error("Database setup error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown database setup error",
    }
  }
}
