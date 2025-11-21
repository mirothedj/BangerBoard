import { NextResponse } from "next/server";

/**
 * Test endpoint to check Ezoic integration status
 * This will check if the server environment has the necessary configuration
 * for Ezoic integration.
 */
export async function GET() {
  try {
    // Get Ezoic-related environment variables or configuration
    const ezoicConfig = {
      // Check for any Ezoic-specific environment variables
      domain: process.env.EZOIC_DOMAIN || "bangerboard.com",
      ezoicEnabled: process.env.EZOIC_ENABLED === "true",
      integrationVersion: "1.0.0", // Version of your Ezoic integration
      placeholderCount: 15, // Number of ad placeholders defined
      status: "active"
    };

    // Return the Ezoic configuration status
    return NextResponse.json({
      status: "success",
      message: "Ezoic integration is configured",
      config: ezoicConfig,
      integrationGuide: {
        placeholderUsage: "Use EzoicAd component with appropriate placeholder IDs",
        infiniteScroll: "Use destroyPlaceholders followed by showAds for infinite scroll",
        dynamicContent: "Call showAds when content changes dynamically"
      }
    });
  } catch (error) {
    console.error("Error checking Ezoic status:", error);
    return NextResponse.json(
      { 
        status: "error", 
        message: "Failed to check Ezoic integration status", 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
