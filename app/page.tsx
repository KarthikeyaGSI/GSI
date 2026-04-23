"use client"

import dynamic from "next/dynamic"

const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false })
const Overlay = dynamic(() => import("@/components/ui/Overlay"), { ssr: false })
const Preloader = dynamic(() => import("@/components/ui/Preloader"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false })

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen">
      <CustomCursor />
      <Preloader />
      <Scene />
      <Overlay />
      
      {/* Scroll height */}
      <div className="h-[500vh] w-full" />
    </main>
  )
}
