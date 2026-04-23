"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"
import { GravitySphereShader } from "../3d/Objects"

function LoadingLogo() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <motion.div 
        className="absolute inset-0 border-2 border-purple-500/30 rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="w-16 h-16 border-t-2 border-purple-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full animate-pulse" />
    </div>
  )
}

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + 1
      })
    }, 30)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          <div className="w-64 h-64 mb-8">
            <LoadingLogo />
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-zinc-500 font-mono tracking-[0.5em] text-sm uppercase"
            >
              Entering Experience
            </motion.span>
            
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-purple-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
              />
            </div>
            
            <span className="text-white font-mono text-xs">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
