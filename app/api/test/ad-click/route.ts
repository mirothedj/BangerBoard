import { NextResponse } from "next/server";
import { incrementAdClicks } from "@/lib/db";

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
    // Call the click tracking function
    await incrementAdClicks(adId);
    
    return NextResponse.json({
      success: true,
      message: `Successfully recorded click for ad ${adId}`
    });
  } catch (error) {
    console.error("Error in ad click test:", error);
    return NextResponse.json(
      { error: "Failed to record ad click" },
      { status: 500 }
    );
  }
} 