import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import skyModel from '/models/sky.glb'

const Sky = ({ isRotating }) => {
  const sky = useGLTF(skyModel) 
  const skyRef = useRef()

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.15 * delta
    }
  })

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene} />
    </mesh>
  )
}

export default Sky

