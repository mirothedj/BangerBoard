"use client"

interface FireRatingProps {
  rating: number
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  size?: "sm" | "md"
}

export function FireRating({ rating, interactive = false, onRatingChange, size = "md" }: FireRatingProps) {
  const roundedRating = Math.round(rating)

  const fires = Array.from({ length: 6 }, (_, i) => {
    const value = i + 1

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
        className={`${color} ${extraClasses} ${interactive ? "cursor-pointer" : ""} ${size === "sm" ? "text-xs" : ""}`}
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
