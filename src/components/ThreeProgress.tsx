'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, GradientTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useTasks } from '../context/TaskContext';

const ProgressOrb = ({ progress }: { progress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Dynamic values based on progress
  const speed = useMemo(() => 1 + (progress / 100) * 4, [progress]);
  const distortion = useMemo(() => 0.2 + (progress / 100) * 0.6, [progress]);
  
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2 * speed;
    meshRef.current.rotation.y = t * 0.3 * speed;
  });

  return (
    <Sphere args={[1, 100, 100]} ref={meshRef}>
      <MeshDistortMaterial
        color={progress >= 100 ? "#4F46E5" : "#6366F1"}
        speed={speed}
        distort={distortion}
        radius={1}
      >
        <GradientTexture
          stops={[0, 0.5, 1]}
          colors={progress >= 100 ? ['#4F46E5', '#10B981', '#4F46E5'] : ['#6366F1', '#EC4899', '#6366F1']}
        />
      </MeshDistortMaterial>
    </Sphere>
  );
};

const ThreeProgress = () => {
  const { tasks } = useTasks();
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-transparent rounded-3xl overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-indigo-500/5 dark:bg-indigo-500/10 blur-3xl transition-colors duration-500" />
      
      <div className="absolute top-6 left-6 z-10">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">Team Velocity</h3>
        <p className="text-xs text-gray-400 font-medium">Visualizing task completion</p>
      </div>

      <div className="absolute bottom-6 left-6 z-10 flex items-end gap-3">
        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
          {Math.round(overallProgress)}%
        </div>
        <div className="mb-1 text-xs font-bold text-gray-400 uppercase tracking-widest">
          Complete
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} className="cursor-grab active:cursor-grabbing">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <ProgressOrb progress={overallProgress} />
        </Float>
      </Canvas>
      
      {/* Decorative corners */}
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-indigo-500/20 rounded-tr-xl" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-indigo-500/20 rounded-br-xl" />
    </div>
  );
};

export default ThreeProgress;
