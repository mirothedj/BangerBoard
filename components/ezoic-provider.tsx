"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initEzoic, refreshAdsOnNavigation } from "@/lib/ezoic";

/**
 * EzoicProvider initializes Ezoic and refreshes ads on route changes
 * This should be included near the root of your application
 */
export default function EzoicProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize Ezoic on mount
  useEffect(() => {
    initEzoic();
  }, []);

  // Refresh ads when route changes
  useEffect(() => {
    refreshAdsOnNavigation();
  }, [pathname, searchParams]);

  return <>{children}</>;
}
