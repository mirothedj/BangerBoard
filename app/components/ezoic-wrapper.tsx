'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const EzoicScript = dynamic(() => import("@/components/ezoic-script"), {
  ssr: false,
})

const EzoicProvider = dynamic(() => import("@/components/ezoic-provider"), {
  ssr: false,
})

export function EzoicWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <EzoicScript />
      <EzoicProvider>{children}</EzoicProvider>
    </>
  )
}
