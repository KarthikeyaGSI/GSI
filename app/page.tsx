"use client"

import dynamic from "next/dynamic"
import React, { Suspense } from "react"

// Dynamic imports with SSR disabled for all 3D/Browser components
const Scene = dynamic(() => import("@/components/3d/Scene"), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" />
})

const Overlay = dynamic(() => import("@/components/ui/Overlay"), { 
  ssr: false 
})

const Preloader = dynamic(() => import("@/components/ui/Preloader"), { 
  ssr: false 
})

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { 
  ssr: false 
})

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen w-full overflow-hidden">
      <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
        <CustomCursor />
        <Preloader />
        <Scene />
        <Overlay />
        
        {/* Scroll height to drive animations */}
        <div className="h-[500vh] w-full pointer-events-none" />
      </Suspense>
    </main>
  )
}
