import { NextResponse } from "next/server";
import { incrementAdImpressions } from "@/lib/db";

export async function POST(request: Request) {
  // Get the adId from query parameters
  const url = new URL(request.url);
  const adId = url.searchParams.get("adId");
  
  if (!adId) {
    return NextResponse.json(
      { error: "Missing adId parameter" },
      { status: 400 }
    );
  }
  
  try {
    // Call the impression tracking function
    await incrementAdImpressions(adId);
    
    return NextResponse.json({
      success: true,
      message: `Successfully recorded impression for ad ${adId}`
    });
  } catch (error) {
    console.error("Error in ad impression test:", error);
    return NextResponse.json(
      { error: "Failed to record ad impression" },
      { status: 500 }
    );
  }
}
