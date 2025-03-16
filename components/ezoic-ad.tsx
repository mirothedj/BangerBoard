"use client";

import { useEffect, useRef } from "react";
import { showAds } from "@/lib/ezoic";

interface EzoicAdProps {
  id: number;
  className?: string;
  style?: React.CSSProperties;
  onAdLoaded?: () => void;
}

/**
 * EzoicAd component creates a div with the appropriate Ezoic placeholder ID
 * and triggers ad loading when the component mounts
 */
export default function EzoicAd({ id, className, style, onAdLoaded }: EzoicAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    // Skip if already loaded or no ref
    if (loadedRef.current || !adRef.current) return;
    
    // Set up intersection observer to load ad when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loadedRef.current) {
            loadedRef.current = true;
            
            // Call Ezoic to load the ad
            showAds(id);
            
            // Notify parent component if needed
            if (onAdLoaded) {
              onAdLoaded();
            }
            
            // Disconnect observer after loading
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 } // Trigger when at least 10% of the ad is visible
    );
    
    observer.observe(adRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [id, onAdLoaded]);
  
  return (
    <div
      id={`ezoic-pub-ad-placeholder-${id}`}
      ref={adRef}
      className={className}
      style={{
        minHeight: "90px", // Minimum height to prevent layout shifts
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style
      }}
      data-testid={`ezoic-ad-${id}`}
    >
      {/* Ezoic will replace this content */}
      <div className="text-sm text-muted-foreground opacity-50">Advertisement</div>
    </div>
  );
} 