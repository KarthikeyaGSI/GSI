import Scene from "@/components/3d/Scene"
import Overlay from "@/components/ui/Overlay"
import Preloader from "@/components/ui/Preloader"
import CustomCursor from "@/components/ui/CustomCursor"

export default function Home() {
  return (
    <main className="relative bg-black">
      <CustomCursor />
      <Preloader />
      <Scene />
      <Overlay />
      
      {/* Scroll height */}
      <div className="h-[500vh] w-full" />
    </main>
  )
}
