"use client"

interface MicRatingProps {
  rating: number
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

// Rename the component to FireRating
export function FireRating({ rating, interactive = false, onRatingChange }: MicRatingProps) {
  // Round to nearest 1.0 (no half ratings with fire emojis)
  const roundedRating = Math.round(rating)

  // Create array of 6 fire emojis (instead of 5 mics)
  const fires = Array.from({ length: 6 }, (_, i) => {
    const value = i + 1

    // Determine fire color based on value
    let color = ""
    let extraClasses = ""

    if (value <= roundedRating) {
      if (value === 6) {
        color = "text-gold animate-flame"
        extraClasses = "drop-shadow-[0_0_3px_rgba(255,215,0,0.7)]"
      } else if (value === 5) {
        color = "text-silver"
        extraClasses = "drop-shadow-[0_0_2px_rgba(192,192,192,0.5)]"
      } else if (value === 4) {
        color = "text-foreground"
      } else if (value === 3) {
        color = "text-purple"
      } else if (value === 2) {
        color = "text-ice"
      } else if (value === 1) {
        color = "text-muted-foreground"
      }
    } else {
      color = "text-muted-foreground/30"
    }

    return (
      <span
        key={value}
        className={`${color} ${extraClasses} ${interactive ? "cursor-pointer" : ""}`}
        onClick={() => {
          if (interactive && onRatingChange) {
            onRatingChange(value)
          }
        }}
      >
        🔥
      </span>
    )
  })

  return <div className="flex items-center gap-0.5">{fires}</div>
}

// Keep the MicRating export for backward compatibility
export function MicRating(props: MicRatingProps) {
  return <FireRating {...props} />
}

