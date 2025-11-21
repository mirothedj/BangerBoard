"use client";

/**
 * Ezoic ad integration utility
 * Provides functions to manage Ezoic ads in a Next.js application
 */

declare global {
  interface Window {
    ezstandalone: {
      cmd: Array<() => void>;
      showAds: (...placeholderIds: number[]) => void;
      destroyPlaceholders: (...placeholderIds: number[]) => void;
      destroyAll: () => void;
      enabled: boolean;
    };
  }
}

/**
 * Initialize Ezoic on client-side
 * Should be called once at the application startup
 */
export function initEzoic(): void {
  if (typeof window === 'undefined') return;
  
  // Initialize the ezstandalone object if it doesn't exist
  window.ezstandalone = window.ezstandalone || {};
  window.ezstandalone.cmd = window.ezstandalone.cmd || [];
  
  // Flag to prevent multiple script loads
  if (document.getElementById('ezoic-script')) return;
  
  // Create and append Ezoic script
  const script = document.createElement('script');
  script.id = 'ezoic-script';
  script.async = true;
  script.src = '//www.ezojs.com/ezoic/sa.min.js'; // Update this URL if Ezoic provides a different one
  document.head.appendChild(script);
}

/**
 * Display ads in specific placeholders
 * @param placeholderIds - IDs of placeholders to show ads in
 */
export function showAds(...placeholderIds: number[]): void {
  if (typeof window === 'undefined' || !window.ezstandalone) return;
  
  window.ezstandalone.cmd.push(() => {
    if (placeholderIds.length > 0) {
      window.ezstandalone.showAds(...placeholderIds);
    } else {
      window.ezstandalone.showAds();
    }
  });
}

/**
 * Destroy ads in specific placeholders
 * @param placeholderIds - IDs of placeholders to destroy
 */
export function destroyPlaceholders(...placeholderIds: number[]): void {
  if (typeof window === 'undefined' || !window.ezstandalone) return;
  
  window.ezstandalone.cmd.push(() => {
    window.ezstandalone.destroyPlaceholders(...placeholderIds);
  });
}

/**
 * Destroy all ad placeholders
 */
export function destroyAllAds(): void {
  if (typeof window === 'undefined' || !window.ezstandalone) return;
  
  window.ezstandalone.cmd.push(() => {
    window.ezstandalone.destroyAll();
  });
}

/**
 * Refresh ads on page navigation
 * Call this when the URL changes in your app
 */
export function refreshAdsOnNavigation(): void {
  if (typeof window === 'undefined' || !window.ezstandalone) return;
  
  window.ezstandalone.cmd.push(() => {
    window.ezstandalone.showAds();
  });
}

// Map of ad placement locations to placeholder IDs
export const AdPlaceholders = {
  // Top-level placements
  HEADER: 101,
  SIDEBAR_TOP: 102,
  SIDEBAR_BOTTOM: 103,
  
  // Content placements
  CONTENT_TOP: 104,
  CONTENT_MIDDLE: 105,
  CONTENT_BOTTOM: 106,
  
  // Auto-scroll placements (for infinite scroll)
  SCROLL_1: 201,
  SCROLL_2: 202,
  SCROLL_3: 203,
  SCROLL_4: 204,
  SCROLL_5: 205,
  
  // Native ad placements (these blend in with content)
  NATIVE_1: 301,
  NATIVE_2: 302,
  NATIVE_3: 303
};
