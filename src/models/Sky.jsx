import { useRef } from 'react'             // ✅ React hook
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import skyScene from '../assets/3d/sky.glb'

const Sky = ({ isRotating }) => {
  const sky = useGLTF(skyScene)
  const skyRef = useRef()

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.15 * delta
    }
  })

  return (
    <primitive ref={skyRef} object={sky.scene} />
  )
}

export default Sky