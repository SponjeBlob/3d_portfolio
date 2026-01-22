import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 80
const FADE_SPEED = 0.007

const SpeedLines = ({ isActive }) => {
  const mesh = useRef()
  const { camera } = useThree()

  const dummy = useMemo(() => new THREE.Object3D(), [])

  // 1️⃣ Add a ref to the material
  const materialRef = useRef()  // <-- ADD THIS

  // positions for lines
  const positions = useMemo(
    () =>
      new Array(COUNT).fill().map(() => ({
        x: Math.random() * 40 - 52,   // start somewhere wide on X
        y: Math.random() * 6 - 3,     // height spread
        z: Math.random() * 20 - 10,   // depth spread
        speed: 0.2 + Math.random() * 0.5, 
      })),
    []
  )

  useFrame(() => {
    // 2️⃣ Fade in/out logic here
    if (materialRef.current) {
      if (isActive) {
        materialRef.current.opacity += FADE_SPEED
        if (materialRef.current.opacity > 0.25) materialRef.current.opacity = 0.25
      } else {
        materialRef.current.opacity -= FADE_SPEED
        if (materialRef.current.opacity < 0) materialRef.current.opacity = 0
      }
    }

    if (!isActive && materialRef.current.opacity <= 0) return // skip updating positions when invisible

    positions.forEach((p, i) => {
      p.x -= p.speed   // move left
      if (p.x < -20) p.x = 20   // reset on the right

      dummy.position.set(p.x, p.y, p.z)
      dummy.scale.set(2.5, 0.05, 0.05) // wide and flat
      dummy.rotation.set(0, 0, 0) // keep landscape
      dummy.updateMatrix()

      mesh.current.setMatrixAt(i, dummy.matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={materialRef}  // 3️⃣ attach the ref here
        color="white"
        transparent
        opacity={0}  // start invisible
        depthWrite={false}
      />
    </instancedMesh>
  )
}

export default SpeedLines
