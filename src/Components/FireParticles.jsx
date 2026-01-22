import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FireParticles = ({ position = [0, 0, 0], count = 50, isActive = false }) => {
  const pointsRef = useRef()

  // Create particle positions and velocities once
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.05
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.05
      positions[i * 3 + 2] = 0

      velocities[i * 3] = 0
      velocities[i * 3 + 1] = 0
      velocities[i * 3 + 2] = -(0.005 + Math.random() * 0.005)
    }
    return { positions, velocities }
  }, [count])

  useFrame(() => {
    if (!pointsRef.current || !isActive) return // <-- skip if not active

    const pos = pointsRef.current.geometry.attributes.position.array
    const vel = particles.velocities

    for (let i = 0; i < count; i++) {
      pos[i * 3] += vel[i * 3]
      pos[i * 3 + 1] += vel[i * 3 + 1]
      pos[i * 3 + 2] += vel[i * 3 + 2]

      // reset particle if it goes too far
      if (pos[i * 3 + 2] < -0.25) {
        pos[i * 3] = (Math.random() - 0.5) * 0.25
        pos[i * 3 + 1] = (Math.random() - 0.5) * 0.1
        pos[i * 3 + 2] = 0
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  if (!isActive) return null // <-- hide when not active

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="orange"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </points>
  )
}

export default FireParticles
