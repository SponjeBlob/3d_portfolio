import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";


import islandScene from "../assets/3d/island_portfolio.glb";

import Beacon from '../models/Beacon'; 


export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) {
  const islandRef = useRef();
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  const hasInteracted = useRef(false);


  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.005 * Math.PI;
    
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  // Touch events for mobile devices
  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
  
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  }
  
  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  }
  
  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
  
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
  
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  }

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchmove", handleTouchMove);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // This function is called on each frame update
useFrame(() => {
  const isMobile = window.innerWidth < 768;

  if (!hasInteracted.current) {
    if (isMobile) {
      // On mobile, any touch counts
      if (isRotating) {
        hasInteracted.current = true;
        window.dispatchEvent(new Event("island-rotated"));
      }
    } else {
      // On desktop, require actual rotation speed
      if (Math.abs(rotationSpeed.current) > 0.0005) {
        hasInteracted.current = true;
        window.dispatchEvent(new Event("island-rotated"));
      }
    }
  }

  // --- your normal rotation / damping logic stays here ---
  if (!isRotating) {
    rotationSpeed.current *= 0.95;
    if (Math.abs(rotationSpeed.current) < 0.001) rotationSpeed.current = 0;
    islandRef.current.rotation.y += rotationSpeed.current;
  } else {
    const rotation = islandRef.current.rotation.y;
    const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    switch (true) {
      case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
        setCurrentStage(4);
        break;
      case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
        setCurrentStage(3);
        break;
      case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
        setCurrentStage(2);
        break;
      case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
        setCurrentStage(1);
        break;
      default:
        setCurrentStage(null);
    }
  }
});



    return (
      <a.group ref={islandRef} {...props}>
      <mesh
        
        
        geometry={nodes.asteroid.geometry}
        material={materials['asteroid ']}
      />
      
      <mesh
        
        
        geometry={nodes.stairs.geometry}
        material={materials['stair.001']}
        position={[0, 2.498, 0]}
      />
      <mesh
        
        
        geometry={nodes.dig_1.geometry}
        material={materials['Dig 1 mat']}
        position={[-0.604, 1.839, -1.145]}
        rotation={[Math.PI, -1.109, Math.PI]}
        scale={0.062}
      />
      
      <mesh
        
        
        geometry={nodes.dig2.geometry}
        material={materials['dig 2']}
        position={[0.125, 1.934, 0.935]}
        rotation={[0, -0.432, 0]}
        scale={0.062}
      />
      <mesh
        
        
        geometry={nodes.dig003.geometry}
        material={materials['dig 3']}
        position={[-0.201, 1.934, 0.935]}
        rotation={[0, 0.374, 0]}
        scale={0.062}
      />
      <mesh
        
        
        geometry={nodes.spacehouse.geometry}
        material={materials.house}
        position={[0.961, 1.874, 0.24]}
        scale={[0.063, 0.063, 0.124]}
      />
      <mesh
        
        
        geometry={nodes.spacehouse2.geometry}
        material={materials['house 2']}
        position={[-0.89, 1.9, 0.35]}
        rotation={[Math.PI, -1.09, Math.PI]}
        scale={[0.063, 0.063, 0.124]}
      />

       <mesh
        castShadow
        receiveShadow
        geometry={nodes.platform_.geometry}
        material={materials['platform.001']}
        position={[0, 2, 1.54]}
        scale={[0.224, 0.026, 0.224]}
      />
      <mesh
        
        
        geometry={nodes.spacehouse3.geometry}
        material={materials['house 3']}
        position={[0.142, 1.9, -0.821]}
        rotation={[-Math.PI, 1.123, -Math.PI]}
        scale={[0.063, 0.063, 0.124]}
        />

        <Beacon position={[0, 0, 0]} />


    </a.group>
  );
}

export default Island;