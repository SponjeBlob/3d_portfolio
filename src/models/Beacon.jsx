import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import beaconsGLB from '../assets/3d/beacons.glb'

export default function Beacon(props) {
  const { nodes, materials } = useGLTF(beaconsGLB)
  const groupRef = useRef()           // top-level group ref (optional)
  const beaconRefs = useRef([])       // refs to all light meshes

  // Animate the lights
  useFrame(({ clock }) => {
    const t = Math.abs(Math.sin(clock.getElapsedTime() * 5)) // 0 → 1 flashing
    beaconRefs.current.forEach(mesh => {
      if (mesh) mesh.material.emissiveIntensity = 0.1 + t * 0.7
    })
  })

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.beacon.geometry}
        material={materials['Material.001']}
        position={[0.665, 1.863, 1.326]}
        rotation={[-Math.PI, 0, -3.012]}
        scale={0.018}>
        <mesh
          ref={el => (beaconRefs.current[0] = el)}
          castShadow
          receiveShadow
          geometry={nodes.Icosphere.geometry}
          material={materials['light.001']}
          position={[-0.052, 40.1, 3.639]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={3.581}
        />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.beacon001.geometry}
        material={materials['Material.001']}
        position={[1.645, 1.967, -0.201]}
        rotation={[2.922, 0, -Math.PI]}
        scale={0.018}>
        <mesh
          ref={el => (beaconRefs.current[1] = el)}
          castShadow
          receiveShadow
          geometry={nodes.Icosphere001.geometry}
          material={materials['light.001']}
          position={[-0.052, 40.1, 3.639]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={3.581}
        />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.beacon002.geometry}
        material={materials['Material.001']}
        position={[-1.237, 2.091, -1.283]}
        rotation={[-Math.PI, 1.037, -Math.PI]}
        scale={0.018}>
        <mesh
          ref={el => (beaconRefs.current[2] = el)}
          castShadow
          receiveShadow
          geometry={nodes.Icosphere002.geometry}
          material={materials['light.001']}
          position={[-0.052, 40.1, 3.639]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={3.581}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload(beaconsGLB)
