"use server"

import { sql as vercelSql } from "@vercel/postgres"
import { setupMockDatabase } from "./mock-db"

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === "development"

// Use real or mock SQL based on environment
const sql = isDevelopment ? require("./mock-db").sql : vercelSql

export async function setupDatabase() {
  try {
    // If in development, use mock setup
    if (isDevelopment) {
      return await setupMockDatabase()
    }

    // Create submissions table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        platform TEXT NOT NULL,
        submitted_at TIMESTAMP NOT NULL,
        status TEXT NOT NULL,
        meets_criteria BOOLEAN DEFAULT FALSE
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
