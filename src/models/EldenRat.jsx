
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import scene from '../assets/3d/EldenRat.glb'
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';



const EldenRat = (currentAnimation = 'Idle.001', ...props ) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(scene)
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions.Idle) {
      actions['Idle.001']?.play();
      actions['Idle.001'].setLoop(THREE.LoopRepeat, Infinity);
      console.log('Available animations:', Object.keys(actions));
    }

  }, [actions, currentAnimation])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="rig_deform" position={[0.09, -0.05, -0.005]} scale={0.263}>
          <skinnedMesh
            name="elder__rat"
            geometry={nodes.elder__rat.geometry}
            material={materials.ElderRatUV}
            skeleton={nodes.elder__rat.skeleton}
          />
          <skinnedMesh
            name="EYEPATCH"
            geometry={nodes.EYEPATCH.geometry}
            material={materials.eyepatch}
            skeleton={nodes.EYEPATCH.skeleton}
          />
          <skinnedMesh
            name="tail"
            geometry={nodes.tail.geometry}
            material={materials['elderrat tail']}
            skeleton={nodes.tail.skeleton}
          />
          <primitive object={nodes['DEF-L_ear_2']} />
          <primitive object={nodes['DEF-L_ear']} />
          <primitive object={nodes['DEF-R_ear_2']} />
          <primitive object={nodes['DEF-R_ear']} />
          <primitive object={nodes['DEF-mustache']} />
          <primitive object={nodes['DEF-mustache001']} />
          <primitive object={nodes['DEF-mustache002']} />
          <primitive object={nodes['DEF-spine004']} />
          <primitive object={nodes['DEF-spine']} />
          <primitive object={nodes['DEF-pelvisL']} />
          <primitive object={nodes['DEF-pelvisR']} />
          <primitive object={nodes['DEF-thighL']} />
          <primitive object={nodes['DEF-thighR']} />
          <primitive object={nodes['DEF-shoulderL']} />
          <primitive object={nodes['DEF-front_thighL']} />
          <primitive object={nodes['DEF-shoulderR']} />
          <primitive object={nodes['DEF-front_thighR']} />
          <primitive object={nodes['DEF-breastL']} />
          <primitive object={nodes['DEF-breastR']} />
        </group>
      </group>
    </group>
  )
}

export default EldenRat
