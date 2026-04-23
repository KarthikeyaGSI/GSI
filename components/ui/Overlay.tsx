"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowRight, ExternalLink, CheckCircle2, TrendingUp, Zap } from "lucide-react"

function NavIndicator({ i, progress }: { i: number; progress: any }) {
  const scaleY = useTransform(progress, [i * 0.125, (i + 1) * 0.125], [0, 1])
  
  return (
    <div className="w-1 h-8 bg-zinc-900/50 rounded-full overflow-hidden border border-white/5">
      <motion.div 
        className="w-full bg-purple-500 origin-top"
        style={{ scaleY }}
      />
    </div>
  )
}

export default function Overlay() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Mappings for 8 sections
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const quoteOpacity = useTransform(scrollYProgress, [0.1, 0.18, 0.25], [0, 1, 0])
  const whatWeDoOpacity = useTransform(scrollYProgress, [0.25, 0.33, 0.42], [0, 1, 0])
  const whyWorksOpacity = useTransform(scrollYProgress, [0.42, 0.5, 0.58], [0, 1, 0])
  const whatYouGetOpacity = useTransform(scrollYProgress, [0.58, 0.66, 0.75], [0, 1, 0])
  const proofOpacity = useTransform(scrollYProgress, [0.75, 0.83, 0.92], [0, 1, 0])
  const contactOpacity = useTransform(scrollYProgress, [0.92, 1], [0, 1])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const scrollToSection = (progress: number) => {
    const target = document.documentElement.scrollHeight * progress
    window.scrollTo({ top: target, behavior: "smooth" })
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none p-6 md:p-24">
        
        {/* 1. Hero Section */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="flex flex-col items-center text-center max-w-5xl"
        >
          <span className="text-purple-500 font-mono tracking-[0.3em] mb-4 uppercase text-sm">MarketingKo Labs</span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight mb-8">
            WE BUILD WEBSITES <br /> 
            PEOPLE DON'T <span className="gradient-text italic">SCROLL.</span>
          </h1>
          <p className="text-lg md:text-2xl text-zinc-400 font-light mb-12 tracking-wide">
            We build experiences.
          </p>
          <button 
            onClick={() => scrollToSection(0.12)}
            className="pointer-events-auto px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-xl text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-4 group"
          >
            ENTER THE EXPERIENCE <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>

        {/* 2. Quote Section */}
        <motion.div 
          style={{ opacity: quoteOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
        >
          <div className="max-w-3xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 leading-tight">
              IF YOUR WEBSITE LOOKS LIKE EVERYONE ELSE, <br />
              <span className="text-zinc-500">IT GETS IGNORED.</span>
            </h2>
            <div className="flex flex-col gap-4 text-xl md:text-2xl text-zinc-400 font-light">
              <p>People don’t read. They react.</p>
              <p className="text-white font-medium">Your first 5 seconds decide everything.</p>
            </div>
          </div>
        </motion.div>

        {/* 3. What We Do */}
        <motion.div 
          style={{ opacity: whatWeDoOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
        >
          <div className="max-w-4xl w-full">
            <span className="text-purple-500 font-mono mb-4 block text-sm uppercase tracking-widest">What we do</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-12">WE DESIGN & BUILD <br />PREMIUM WEBSITES.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Grab attention", desc: "Instantly pull users into your story.", icon: Zap },
                { title: "Hold with motion", desc: "Use depth to create engagement.", icon: TrendingUp },
                { title: "Turn to inquiries", desc: "Conversions that matter.", icon: CheckCircle2 }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <item.icon className="text-purple-500 w-8 h-8" />
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-zinc-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 4. Why It Works */}
        <motion.div 
          style={{ opacity: whyWorksOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
        >
          <div className="max-w-4xl text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-12">BUILT TO BE <span className="gradient-text">FELT.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="glass-panel p-8">
                <h3 className="text-purple-500 font-mono text-xs mb-4 uppercase">TECH 01</h3>
                <p className="text-xl font-medium">3D Interaction</p>
              </div>
              <div className="glass-panel p-8">
                <h3 className="text-purple-500 font-mono text-xs mb-4 uppercase">TECH 02</h3>
                <p className="text-xl font-medium">Cinematic Motion</p>
              </div>
              <div className="glass-panel p-8">
                <h3 className="text-purple-500 font-mono text-xs mb-4 uppercase">TECH 03</h3>
                <p className="text-xl font-medium">Structured Flow</p>
              </div>
            </div>
            <p className="mt-12 text-zinc-400 text-xl font-light italic">"So users don’t just visit. They experience."</p>
          </div>
        </motion.div>

        {/* 5. What You Get */}
        <motion.div 
          style={{ opacity: whatYouGetOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">WHAT YOU GET.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
              {[
                "Custom-built (No templates)",
                "Fast, responsive performance",
                "Clear conversion flow",
                "Premium brand perception"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-6 border-b border-white/10 pb-6">
                  <span className="text-purple-500 font-mono text-lg">0{i+1}</span>
                  <p className="text-2xl font-light">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 6. Proof (SSV) */}
        <motion.div 
          style={{ opacity: proofOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
        >
          <div className="max-w-5xl w-full glass-panel p-12 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <span className="text-blue-500 font-mono mb-4 block text-sm uppercase tracking-widest">Proof of results</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">SSV CONVENTIONS</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                A standard venue website turned into a premium experience. 
                Strong first impression, visual-led storytelling, designed for results.
              </p>
              <div className="flex gap-12 mb-8">
                <div>
                  <p className="text-3xl font-bold text-white">10X</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-tighter">Inquiries</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">100X</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-tighter">Bookings / Month</p>
                </div>
              </div>
              <a 
                href="https://www.ssvconventions.in/" 
                target="_blank"
                className="pointer-events-auto inline-flex items-center gap-2 text-white hover:text-blue-500 transition-colors font-bold uppercase tracking-widest text-sm"
              >
                VIEW PROJECT <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="flex-1 w-full aspect-video bg-zinc-900 rounded-xl overflow-hidden relative border border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay" />
              <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-mono text-sm uppercase tracking-widest">
                Visualizing Legacy
              </div>
            </div>
          </div>
        </motion.div>

        {/* 7. Contact Section */}
        <motion.div 
          style={{ opacity: contactOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
        >
          <h2 className="text-4xl md:text-7xl font-black text-center mb-8 leading-tight">
            IF YOUR WEBSITE ISN'T CONVERTING, <br /> 
            <span className="gradient-text italic">IT'S COSTING YOU.</span>
          </h2>
          <p className="text-xl md:text-3xl text-zinc-400 font-light mb-12 uppercase tracking-widest">Let's fix that.</p>
          <a 
            href="https://linktr.ee/karthikeyathallapally" 
            target="_blank"
            className="pointer-events-auto px-12 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-all flex items-center gap-4 group"
          >
            BOOK A CALL <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

      </div>

      {/* Navigation Indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-auto">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
           <NavIndicator key={i} i={i} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}
