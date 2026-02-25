'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useTasks } from '../context/TaskContext';

const Orb = () => {
  const { tasks } = useTasks();
  const meshRef = useRef<THREE.Mesh>(null);

  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    const doneTasks = tasks.filter((t) => t.status === 'done').length;
    return doneTasks / tasks.length;
  }, [tasks]);

  // Interpolate color based on progress: Red -> Yellow -> Green
  const color = useMemo(() => {
    const hue = progress * 120; // 0 (red) to 120 (green)
    return new THREE.Color(`hsl(${hue}, 70%, 60%)`);
  }, [progress]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
};

const ProgressOrb = () => {
  return (
    <div className="w-full h-64 relative">
       <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent pointer-events-none rounded-3xl" />
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Orb />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ProgressOrb;
