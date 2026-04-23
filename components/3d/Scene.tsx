"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll, Environment, Float, MeshDistortMaterial } from "@react-three/drei"
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing"
import { GravitySphere, ProjectCard, ExperienceLines } from "./Objects"
import { useRef } from "react"
import * as THREE from "three"

function SceneContent() {
  const scroll = useScroll()
  const cameraGroup = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const offset = scroll.offset
    const isMobile = state.viewport.width < 5
    
    // Cinematic movement: Start distant, pull closer
    // Hero (offset 0): Distant
    // Contact (offset 1): Very close
    const targetZ = THREE.MathUtils.lerp(isMobile ? 25 : 20, -5, offset)
    const targetY = THREE.MathUtils.lerp(0, -2, offset)
    
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05)
    
    // Slight parallax based on mouse with cinematic delay
    const mouseX = (state.mouse.x * state.viewport.width) / 2
    const mouseY = (state.mouse.y * state.viewport.height) / 2
    cameraGroup.current.position.x = THREE.MathUtils.lerp(cameraGroup.current.position.x, mouseX * 0.03, 0.02)
    cameraGroup.current.position.y = THREE.MathUtils.lerp(cameraGroup.current.position.y, mouseY * 0.03, 0.02)
  })

  return (
    <group ref={cameraGroup}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
      <spotLight position={[-10, 10, 10]} angle={0.25} penumbra={1} intensity={3} color="#7c3aed" />
      
      {/* Central Gravity Sphere */}
      <group position={[0, 0, 0]}>
        <GravitySphere scrollOffset={scroll.offset} />
      </group>

      {/* Background Elements (Depth Transitions) */}
      <group position={[0, 0, -20]}>
        <ExperienceLines />
      </group>

      {/* Floating UI Elements in 3D (Project Nodes) */}
      <group position={[0, 0, -10]}>
        {/* These cards will be revealed in the Work section as the camera passes through */}
      </group>

      {/* Work Section */}
      <group position={[0, -5, -30]}>
        <ProjectCard position={[-3, 0, 0]} title="Project Alpha" index={0} />
        <ProjectCard position={[0, 1, 2]} title="Project Beta" index={1} />
        <ProjectCard position={[3, -1, 1]} title="Project Gamma" index={2} />
      </group>

      {/* Experience Section */}
      <group position={[0, -5, -45]}>
        <ExperienceLines />
      </group>

      {/* Contact Section */}
      <group position={[0, -5, -60]}>
         <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <MeshDistortMaterial color="#111" distort={0.2} speed={1} />
         </mesh>
      </group>

      <Environment preset="city" />
      
      <EffectComposer>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </group>
  )
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
        <ScrollControls pages={5} damping={0.3}>
          <SceneContent />
        </ScrollControls>
      </Canvas>
    </div>
  )
}
