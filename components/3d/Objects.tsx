"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Text } from "@react-three/drei"
import * as THREE from "three"

export const GravitySphereShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
    uColor: { value: new THREE.Color("#7c3aed") },
    uIntensity: { value: 0.4 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;
    uniform vec2 uMouse;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      
      // Ripple effect
      float dist = distance(uv, uMouse * 0.5 + 0.5);
      float ripple = sin(dist * 20.0 - uTime * 4.0) * 0.05;
      
      vec3 newPosition = position + normal * ripple;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform float uTime;
    uniform vec3 uColor;
    
    void main() {
      float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
      vec3 glow = uColor * intensity * 2.0;
      gl_FragColor = vec4(glow + vec3(0.05), 1.0);
    }
  `
}

export function GravitySphere({ scrollOffset }: { scrollOffset: number }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<any>(null!)
  const { viewport, mouse } = useThree()
  const isMobile = viewport.width < 5
  
  const splitFactor = Math.max(0, Math.min(1, (scrollOffset - 0.4) * 4)) * (scrollOffset < 0.65 ? 1 : Math.max(0, 1 - (scrollOffset - 0.65) * 4))

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time
      materialRef.current.uniforms.uMouse.value.lerp(mouse, 0.1)
    }
    
    const pulse = Math.sin(time * 2) * 0.05 + 1
    mesh.current.scale.setScalar((isMobile ? 0.7 : 1) * pulse)
    mesh.current.rotation.y = time * 0.3
    mesh.current.rotation.x = time * 0.1
    
    // Mouse interaction: move sphere slightly
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, mouse.x * 0.5, 0.1)
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, mouse.y * 0.5, 0.1)
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={mesh}>
          <sphereGeometry args={[1, 64, 64]} />
          <shaderMaterial ref={materialRef} args={[GravitySphereShader]} transparent />
        </mesh>
      </Float>
      
      {/* Internal core light */}
      <pointLight intensity={10} distance={5} color="#7c3aed" />

      {[0, 1, 2].map((i) => (
        <group key={i} position={[
          Math.cos(i * (Math.PI * 2) / 3) * 6 * splitFactor,
          Math.sin(i * (Math.PI * 2) / 3) * 6 * splitFactor,
          -5 * splitFactor
        ]}>
          <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <mesh scale={splitFactor * 0.4}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="#7c3aed" metalness={1} roughness={0} emissive="#3b82f6" emissiveIntensity={2} />
            </mesh>
          </Float>
        </group>
      ))}
    </group>
  )
}

export function ProjectCard({ position, title, index }: { position: [number, number, number], title: string, index: number }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const { viewport } = useThree()
  const isMobile = viewport.width < 5
  
  return (
    <group position={position} scale={isMobile ? 0.8 : 1}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={mesh}>
          <boxGeometry args={[2, 3, 0.1]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/robotomono/v22/L0tkDFI86-99_qJqnS_W9V0.woff"
          >
            {title}
          </Text>
        </mesh>
      </Float>
    </group>
  )
}

export function ExperienceLines() {
  const points = useMemo(() => {
    const p = []
    for (let i = 0; i < 50; i++) {
      p.push(new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10))
    }
    return p
  }, [])

  const linePoints = useMemo(() => {
    const l = []
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i]
      const p2 = points[(i + 1) % points.length]
      l.push(p1, p2)
    }
    return l
  }, [points])

  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#7c3aed" />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(linePoints.flatMap(p => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#3b82f6" transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}
