import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import spaceshipScene from '../assets/3d/Spaceship.glb'
import FireParticles from '../Components/FireParticles'

const Spaceship = ({ isRotating, ...props }) => {
  const ref = useRef()
  const { scene, animations } = useGLTF(spaceshipScene)
  const { actions } = useAnimations(animations, ref)
  const currentAction = useRef()
  const { viewport } = useThree()

  // Play the animation by default
  useEffect(() => {
  if (!actions) return

  const firstAction = Object.values(actions)[0]
  if (!firstAction) return

  firstAction.reset().fadeIn(0.5).play()
  firstAction.setLoop(THREE.LoopRepeat, Infinity)
  currentAction.current = firstAction
}, [actions])


  // Pause/resume animation based on rotation
  useEffect(() => {
    if (!currentAction.current) return
    if (isRotating) {
      currentAction.current.paused = true
    } else {
      currentAction.current.paused = false
    }
  }, [isRotating])

  // Dynamic position and scale based on viewport
  const dynamicScale = viewport.height * 0.001

  return (
    <group ref={ref} scale={[dynamicScale, dynamicScale, dynamicScale]} {...props}>
      <primitive object={scene} />
      
      {/* Fire moves with spaceship */}
      <FireParticles 
        position={[0, 1.45, -0.8]} 
        isActive={isRotating} 
        count={20} 
      />
    </group>
  )
}

export default Spaceship
