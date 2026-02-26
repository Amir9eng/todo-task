'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTasks } from '../context/TaskContext';

const GhostBlob = ({ size = 2, speed = 3, lag = 0.05, opacity = 0.1, color: customColor }: { size?: number, speed?: number, lag?: number, opacity?: number, color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTasks();
  
  // Target position based on mouse
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    if (meshRef.current) {
      // Use much larger multipliers to ensure they can reach the edges of the board.
      // Screen aspect ratio is roughly 2:1, so we map accordingly.
      targetPos.current.set(state.mouse.x * 15, state.mouse.y * 10, -3);
      
      // Smoothly interpolate the blob position towards the mouse with specific lag
      meshRef.current.position.lerp(targetPos.current, lag);
      
      // Add some floating rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * (0.05 * speed);
      meshRef.current.rotation.y = state.clock.getElapsedTime() * (0.1 * speed);
    }
  });

  const finalColor = customColor || (theme === 'dark' ? '#818cf8' : '#6366f1');

  return (
    <Float speed={speed / 2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[size, 64, 64]}>
        <MeshDistortMaterial
          color={finalColor}
          speed={speed}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={theme === 'dark' ? opacity * 2.5 : opacity}
          emissive={theme === 'dark' ? finalColor : '#ffffff'}
          emissiveIntensity={theme === 'dark' ? 1.2 : 0.4}
        />
      </Sphere>
    </Float>
  );
};

const GhostBackground = () => {
  const { theme } = useTasks();
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={theme === 'dark' ? 0.8 : 0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {/* Main "Head" Blob */}
        <GhostBlob size={2.2} lag={0.06} speed={3.5} opacity={0.15} />
        {/* Trailing Blobs with more significant lag differences */}
        <GhostBlob size={1.6} lag={0.03} speed={2.5} opacity={0.1} color={theme === 'dark' ? '#c084fc' : '#8b5cf6'} />
        <GhostBlob size={1.0} lag={0.015} speed={1.5} opacity={0.05} color={theme === 'dark' ? '#f472b6' : '#ec4899'} />
      </Canvas>
    </div>
  );
};

export default GhostBackground;
