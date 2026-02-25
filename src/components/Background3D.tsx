'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingSphere = ({ color, position, size, speed, distort }: { color: string, position: [number, number, number], size: number, speed: number, distort: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.005;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          metalness={0.5}
          roughness={0.5}
          opacity={0.15}
          transparent
        />
      </Sphere>
    </Float>
  );
};

const Background3DContents = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <FloatingSphere color="#6366f1" position={[-4, 2, -5]} size={2} speed={1.5} distort={0.3} />
      <FloatingSphere color="#ec4899" position={[4, -2, -6]} size={2.5} speed={1} distort={0.4} />
      <FloatingSphere color="#8b5cf6" position={[0, -4, -4]} size={1.8} speed={2} distort={0.5} />
    </>
  );
};

const Background3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Background3DContents />
      </Canvas>
    </div>
  );
};

export default Background3D;
