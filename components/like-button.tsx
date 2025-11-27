"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface LikeButtonProps {
  initialLiked?: boolean
  profileId: string
  profileType: "show" | "host" | "artist" | "fan" | "resource"
  size?: "sm" | "md" | "lg"
}

export function LikeButton({ initialLiked = false, profileId, profileType, size = "md" }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleLike = async () => {
    setIsAnimating(true)

    // Simulate API call to like/unlike profile
    try {
      // In a real app, you would call your API here
      // await likeProfile(profileId, profileType, !isLiked)

      // Toggle like state
      setIsLiked(!isLiked)

      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    } catch (error) {
      console.error("Error toggling like:", error)
      setIsAnimating(false)
    }
  }

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            className={`${sizeClasses[size]} p-0 h-auto w-auto hover:bg-transparent`}
          >
            <span className={`transition-transform ${isAnimating ? "scale-125" : "scale-100"}`}>
              {isLiked ? "❤️" : "🫶"}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isLiked ? "Unlike" : "Like"} this {profileType}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
