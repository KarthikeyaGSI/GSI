"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react"

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Map scroll progress to section visibility
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8])
  
  const aboutOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.4], [0, 1, 0])
  const workOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.65], [0, 1, 0])
  const expOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85], [0, 1, 0])
  const contactOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1])

  const scrollToSection = (progress: number) => {
    const target = document.documentElement.scrollHeight * progress
    window.scrollTo({ top: target, behavior: "smooth" })
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10">
      {/* Sections */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none p-6 md:p-24">
        
        {/* Hero Section */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="flex flex-col items-center text-center max-w-4xl"
        >
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none mb-6">
            ATTENTION ISN'T <span className="gradient-text">CAPTURED.</span>
          </h1>
          <p className="text-xl md:text-3xl text-zinc-400 font-light mb-12 tracking-widest uppercase">
            It's Pulled.
          </p>
          <button 
            onClick={() => scrollToSection(0.25)}
            className="pointer-events-auto px-12 py-5 border border-white/20 bg-white/5 backdrop-blur-xl text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-4 group"
          >
            ENTER THE VOID <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>

        {/* About Section */}
        <motion.div 
          style={{ opacity: aboutOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
        >
          <div className="max-w-2xl text-center">
            <h2 className="text-4xl md:text-7xl font-bold mb-8">DIGITAL GRAVITY</h2>
            <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
              We create immersive brand environments that bend the rules of the digital web. 
              Interactive 3D experiences that pull users into your world.
            </p>
          </div>
        </motion.div>

        {/* Work Section */}
        <motion.div 
          style={{ opacity: workOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
        >
          <div className="relative w-full h-full max-w-6xl">
            <motion.div 
              className="absolute left-[10%] top-[20%] pointer-events-auto"
              whileHover={{ scale: 1.1, x: 10 }}
            >
              <div className="glass-panel p-6 max-w-xs cursor-pointer border-purple-500/20 hover:border-purple-500 transition-colors">
                <span className="text-purple-500 font-mono text-xs mb-2 block">PROJECT ALPHA</span>
                <h3 className="text-2xl font-bold mb-2">CYBERPUNK HUD</h3>
                <p className="text-sm text-zinc-400">Revolutionizing UI for the next generation of games.</p>
              </div>
            </motion.div>

            <motion.div 
              className="absolute right-[15%] top-[40%] pointer-events-auto"
              whileHover={{ scale: 1.1, x: -10 }}
            >
              <div className="glass-panel p-6 max-w-xs cursor-pointer border-blue-500/20 hover:border-blue-500 transition-colors">
                <span className="text-blue-500 font-mono text-xs mb-2 block">PROJECT BETA</span>
                <h3 className="text-2xl font-bold mb-2">VOX REALITY</h3>
                <p className="text-sm text-zinc-400">Immersive spatial computing for the modern web.</p>
              </div>
            </motion.div>

            <motion.div 
              className="absolute left-[20%] bottom-[20%] pointer-events-auto"
              whileHover={{ scale: 1.1, y: -10 }}
            >
              <div className="glass-panel p-6 max-w-xs cursor-pointer border-purple-500/20 hover:border-purple-500 transition-colors">
                <span className="text-purple-500 font-mono text-xs mb-2 block">PROJECT GAMMA</span>
                <h3 className="text-2xl font-bold mb-2">AETHER CORE</h3>
                <p className="text-sm text-zinc-400">Where data meets design in high-fidelity 3D.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div 
          style={{ opacity: expOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
        >
          <div className="flex flex-col items-start gap-12 max-w-4xl">
            <div className="flex flex-col">
              <span className="text-purple-500 font-mono text-sm mb-2">01 / MOTION</span>
              <h3 className="text-4xl md:text-6xl font-bold">Fluidity in every pixel</h3>
            </div>
            <div className="flex flex-col self-end">
              <span className="text-blue-500 font-mono text-sm mb-2">02 / INTERACTION</span>
              <h3 className="text-4xl md:text-6xl font-bold text-right">Beyond the click</h3>
            </div>
            <div className="flex flex-col">
              <span className="text-purple-500 font-mono text-sm mb-2">03 / STORYTELLING</span>
              <h3 className="text-4xl md:text-6xl font-bold">A journey, not a page</h3>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          style={{ opacity: contactOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
        >
          <h2 className="text-5xl md:text-8xl font-black text-center mb-12 leading-tight">
            LET'S BUILD SOMETHING <br /> <span className="gradient-text">PEOPLE REMEMBER.</span>
          </h2>
          <div className="flex gap-4 pointer-events-auto">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:invert transition-all flex items-center gap-2">
              BOOK CALL <ExternalLink className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
              VIEW DECK <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

      </div>

      {/* Navigation Indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto">
        {[0, 1, 2, 3, 4].map((i) => (
           <div key={i} className="w-1 h-12 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="w-full bg-purple-500 origin-top"
                style={{ scaleY: useTransform(scrollYProgress, [i * 0.2, (i + 1) * 0.2], [0, 1]) }}
              />
           </div>
        ))}
      </div>
    </div>
  )
}
