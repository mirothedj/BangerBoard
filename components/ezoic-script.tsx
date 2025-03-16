"use client";

import { useEffect } from "react";
import { initEzoic } from "@/lib/ezoic";

// This component initializes Ezoic on the client side
export default function EzoicScript() {
  useEffect(() => {
    // Initialize Ezoic
    initEzoic();
  }, []);

  return null; // This component doesn't render anything
} 