import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 80
const FADE_SPEED = 0.007

const SpeedLines = ({ isActive }) => {
  const mesh = useRef()
  const materialRef = useRef()

  // positions & speeds in a typed array
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 4) // x, y, z, speed
    for (let i = 0; i < COUNT; i++) {
      arr[i * 4 + 0] = Math.random() * 40 - 52
      arr[i * 4 + 1] = Math.random() * 6 - 3
      arr[i * 4 + 2] = Math.random() * 20 - 10
      arr[i * 4 + 3] = 0.2 + Math.random() * 0.5
    }
    return arr
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(() => {
    if (!mesh.current || !materialRef.current) return

    // Fade in/out
    if (isActive) {
      materialRef.current.opacity = Math.min(materialRef.current.opacity + FADE_SPEED, 0.25)
    } else {
      materialRef.current.opacity = Math.max(materialRef.current.opacity - FADE_SPEED, 0)
      if (materialRef.current.opacity <= 0) return
    }

    // Update instances
    for (let i = 0; i < COUNT; i++) {
      let idx = i * 4
      positions[idx + 0] -= positions[idx + 3] // move X by speed
      if (positions[idx + 0] < -20) positions[idx + 0] = 20

      dummy.position.set(positions[idx + 0], positions[idx + 1], positions[idx + 2])
      dummy.scale.set(2.5, 0.05, 0.05)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={materialRef}
        color="white"
        transparent
        opacity={0}
        depthWrite={false}
      />
    </instancedMesh>
  )
}

export default SpeedLines
