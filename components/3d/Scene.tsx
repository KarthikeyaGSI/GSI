"use client"

import React, { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll, Environment, Float, MeshDistortMaterial } from "@react-three/drei"
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing"
import { GravitySphere, ProjectCard, ExperienceLines } from "./Objects"
import * as THREE from "three"

function SceneContent() {
  const scroll = useScroll()
  const cameraGroup = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const offset = scroll.offset
    const isMobile = state.viewport.width < 5
    
    const targetZ = THREE.MathUtils.lerp(isMobile ? 25 : 20, -5, offset)
    const targetY = THREE.MathUtils.lerp(0, -2, offset)
    
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05)
    
    const mouseX = (state.mouse.x * state.viewport.width) / 2
    const mouseY = (state.mouse.y * state.viewport.height) / 2
    cameraGroup.current.position.x = THREE.MathUtils.lerp(cameraGroup.current.position.x, mouseX * 0.03, 0.02)
    cameraGroup.current.position.y = THREE.MathUtils.lerp(cameraGroup.current.position.y, mouseY * 0.03, 0.02)
  })

  return (
    <group>
      <color attach="background" args={["#000000"]} />
      
      <group ref={cameraGroup}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#3b82f6" />
        <spotLight position={[-10, 10, 10]} angle={0.25} penumbra={1} intensity={5} color="#7c3aed" />
        
        <group position={[0, 0, 0]}>
          <GravitySphere scrollOffset={scroll.offset} />
        </group>

        <group position={[0, 0, -20]}>
          <ExperienceLines />
        </group>

        <Environment preset="night" />
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={2} radius={0.5} />
          <Noise opacity={0.05} />
          <Vignette offset={0.3} darkness={0.9} />
        </EffectComposer>
      </group>
    </group>
  )
}

export default function Scene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="fixed inset-0 bg-black" />

  return (
    <div className="fixed inset-0 z-0 h-full w-full">
      <Canvas 
        shadows 
        dpr={[1, 2]} // Performance: limit pixel ratio on high-dpi screens
        camera={{ position: [0, 0, 10], fov: 35 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        <React.Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.3}>
            <SceneContent />
          </ScrollControls>
        </React.Suspense>
      </Canvas>
    </div>
  )
}
