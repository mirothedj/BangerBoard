// This module checks if submitted URL content meets the criteria for automatic show profile creation

// Keywords that indicate the content meets our criteria
const CRITERIA_KEYWORDS = [
  'critic', 
  'critique', 
  'review', 
  'reviews',
  'feedback', 
  'submit', 
  'submission',
  'music review',
  'song review',
  'album review',
  'artist review',
  'track review'
];

export interface ContentCheckResult {
  meetsCriteria: boolean;
  title?: string;
  description?: string;
  channelId?: string;
  thumbnail?: string;
  viewCount?: number;
  contentSnippet?: string;
}

/**
 * Checks if the content at the given URL meets the criteria for automatic show profile creation
 */
export async function checkUrlContentMeetsCriteria(url: string, platform: string): Promise<ContentCheckResult> {
  try {
    let title = '';
    let description = '';
    let channelId = '';
    let thumbnail = '';
    let viewCount = 0;
    
    // For now, we'll use a simplified approach to get basic info from URLs
    // In a production app, you would implement real API calls with proper auth
    
    // Extract basic information from the URL
    if (platform === 'youtube') {
      const videoId = extractYoutubeVideoId(url);
      if (videoId) {
        title = `YouTube Video (ID: ${videoId})`;
        description = `Content from YouTube video at ${url}`;
        thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      }
    } else if (platform === 'twitch') {
      const channelName = extractTwitchChannelName(url);
      if (channelName) {
        title = `Twitch Channel: ${channelName}`;
        description = `Content from Twitch channel ${channelName}`;
        channelId = channelName;
      }
    } else if (platform === 'instagram') {
      title = `Instagram Content`;
      description = `Content from Instagram at ${url}`;
    } else if (platform === 'tiktok') {
      title = `TikTok Content`;
      description = `Content from TikTok at ${url}`;
    }
    
    // Default result
    const result: ContentCheckResult = {
      meetsCriteria: false,
      title,
      description,
      channelId,
      thumbnail,
      viewCount,
      contentSnippet: description.substring(0, 200) || 'No description available'
    };
    
    // Check if any criteria keywords are in the title or description
    const combinedText = `${title || ''} ${description || ''}`.toLowerCase();
    
    // In a real implementation, we would check the actual content from the platform's API
    // For demonstration, we'll randomly determine if it meets criteria based on the URL
    // In a real app, replace this with actual content analysis
    const urlContainsKeyword = CRITERIA_KEYWORDS.some(keyword => 
      url.toLowerCase().includes(keyword.toLowerCase())
    );
    
    // Check if any of the keywords are present in the content
    result.meetsCriteria = urlContainsKeyword || CRITERIA_KEYWORDS.some(keyword => 
      combinedText.includes(keyword.toLowerCase())
    );
    
    // For demonstration, if URL contains 'review', automatically pass criteria check
    if (url.toLowerCase().includes('review')) {
      result.meetsCriteria = true;
    }
    
    return result;
  } catch (error) {
    console.error('Error checking URL content:', error);
    // If there's an error checking content, default to requiring manual review
    return {
      meetsCriteria: false,
      contentSnippet: 'Error fetching content from URL'
    };
  }
}

// Helper functions for extracting IDs from URLs
function extractYoutubeVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

function extractTwitchChannelName(url: string): string | null {
  const regExp = /^.*twitch\.tv\/([a-zA-Z0-9_]+)(?:\/.*)?$/;
  const match = url.match(regExp);
  return match ? match[1] : null;
} 