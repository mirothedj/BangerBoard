"use client"

import Image from "next/image"

export default function ParallaxLogo() {
  return (
    <>
      {/* Image logo */}
      <div className="relative inline-block mx-auto my-8" style={{ zIndex: -5 }}>
        <div className="absolute w-full h-full max-w-[300px] max-h-[300px] bg-fire/20 blur-3xl rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        <div className="relative z-[-10]">
          <Image
            src="/images/design-mode/BangerBoardImageLogo.png"
            alt="BangerBoard Logo"
            width={300}
            height={300}
            className="animate-pulse-glow-slow drop-shadow-[0_0_15px_rgba(255,60,0,0.6)] pointer-events-none"
            priority
          />
        </div>
      </div>
    </>
  )
}
