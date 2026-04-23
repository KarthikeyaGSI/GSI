"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"
import { GravitySphereShader } from "../3d/Objects"

function LoadingLogo() {
  const materialRef = useRef<any>(null!)
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Float speed={4} rotationIntensity={1} floatIntensity={1}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <shaderMaterial ref={materialRef} args={[GravitySphereShader]} transparent />
        </mesh>
      </Float>
    </Canvas>
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
