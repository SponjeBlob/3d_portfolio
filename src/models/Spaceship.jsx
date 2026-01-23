import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import spaceshipScene from '../assets/3d/Spaceship.glb'

const Spaceship = ({ isRotating, ...props }) => {
  const ref = useRef()
  const { scene, animations } = useGLTF(spaceshipScene)
  const { actions } = useAnimations(animations, ref)

  useEffect(() => {
    if (!actions || !actions['Action.002']) return

    const action = actions['Action.002']
    action.reset().fadeIn(0.2).play()
    action.setLoop(THREE.LoopRepeat, Infinity) // always loop
  }, [actions])

  return (
    <>
      <group ref={ref} {...props}>
        <primitive object={scene} />

      </group>

    </>
  )
}

export default Spaceship
