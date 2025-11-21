"use client"

import { Youtube, Twitch, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SocialLinksProps {
  youtube?: string
  twitch?: string
  instagram?: string
  tiktok?: string
  isEditMode?: boolean
}

export function SocialLinks({ youtube, twitch, instagram, tiktok, isEditMode = false }: SocialLinksProps) {
  const handleFollow = (platform: string, id: string) => {
    // In a real app, you would implement the follow functionality
    console.log(`Following ${platform} user: ${id}`)
    alert(`Follow request sent to ${platform}!`)
  }

  return (
    <div className="flex items-center gap-3">
      <TooltipProvider>
        {youtube && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 hover:bg-red-500/10"
                onClick={() => handleFollow("YouTube", youtube)}
              >
                <Youtube className="h-5 w-5 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isEditMode ? "YouTube channel ID for follow requests" : "Send YouTube follow request"}</p>
            </TooltipContent>
          </Tooltip>
        )}

        {twitch && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 hover:bg-purple-500/10"
                onClick={() => handleFollow("Twitch", twitch)}
              >
                <Twitch className="h-5 w-5 text-purple-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isEditMode ? "Twitch username for follow requests" : "Send Twitch follow request"}</p>
            </TooltipContent>
          </Tooltip>
        )}

        {instagram && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 hover:bg-pink-500/10"
                onClick={() => handleFollow("Instagram", instagram)}
              >
                <Instagram className="h-5 w-5 text-pink-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isEditMode ? "Instagram username for follow requests" : "Send Instagram follow request"}</p>
            </TooltipContent>
          </Tooltip>
        )}

        {tiktok && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 hover:bg-cyan-500/10"
                onClick={() => handleFollow("TikTok", tiktok)}
              >
                <svg
                  className="h-5 w-5 text-cyan-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isEditMode ? "TikTok username for follow requests" : "Send TikTok follow request"}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>

      {isEditMode && (
        <p className="text-xs text-muted-foreground italic">
          Note: These links will be used for follow requests, not direct profile links
        </p>
      )}
    </div>
  )
}
