import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

const FireParticles = ({ position = [0,0,0], count = 20, isActive = false }) => {
  const pointsRef = useRef()

  // Precompute positions and velocities
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i*3] = (Math.random() - 0.5) * 0.05 // x wiggle
      positions[i*3+1] = (Math.random() - 0.5) * 0.05 // y wiggle
      positions[i*3+2] = 0 // start at front of exhaust

      velocities[i*3] = 0 // no x movement
      velocities[i*3+1] = 0 // no y movement
      velocities[i*3+2] = -(0.007 + Math.random() * 0.008) // z speed slightly faster
    }
    return { positions, velocities }
  }, [count])

  useFrame(() => {
    if (!pointsRef.current || !isActive) return

    const pos = particles.positions
    const vel = particles.velocities
    const attr = pointsRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      const i3 = i*3

      pos[i3] += vel[i3]
      pos[i3+1] += vel[i3+1]
      pos[i3+2] += vel[i3+2]

      // reset further so particles travel longer
      if (pos[i3+2] < -0.5) {
        pos[i3] = (Math.random() - 0.5) * 0.25
        pos[i3+1] = (Math.random() - 0.5) * 0.1
        pos[i3+2] = 0
      }

      attr[i3] = pos[i3]
      attr[i3+1] = pos[i3+1]
      attr[i3+2] = pos[i3+2]
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  if (!isActive) return null

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
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
