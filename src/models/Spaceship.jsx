import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import spaceshipScene from '../assets/3d/Spaceship.glb'
import FireParticles from '../Components/FireParticles'
import SpeedLines from '../Components/SpeedLines'

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

        {/* propeller */}
        <FireParticles 
          position={[0, 1.45, -0.8]} 
          isActive={isRotating} // only active while rotating
        />
      </group>

      <SpeedLines isActive={isRotating} /> {/* still tied to rotation */}
    </>
  )
}

export default Spaceship
