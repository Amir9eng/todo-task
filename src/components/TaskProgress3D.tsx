'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Float, Text, Environment, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTasks } from '../context/TaskContext';

const ProgressBar = () => {
  const { tasks } = useTasks();
  const barRef = useRef<THREE.Mesh>(null);
  
  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    const done = tasks.filter(t => t.status === 'done').length;
    return done / tasks.length;
  }, [tasks]);

  useFrame(() => {
    if (barRef.current) {
      // Smoothly animate the bar width
      const targetScaleX = progress * 4; // Max width is 4
      barRef.current.scale.x = THREE.MathUtils.lerp(barRef.current.scale.x, targetScaleX || 0.01, 0.1);
      // Adjust position so it grows from the left
      barRef.current.position.x = (barRef.current.scale.x / 2) - 2;
    }
  });

  return (
    <group>
      {/* Background Track */}
      <Box args={[4.1, 0.4, 0.4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#E2E8F0" transparent opacity={0.2} metalness={0.5} roughness={0.5} />
      </Box>
      
      {/* Progress Bar */}
      <Box ref={barRef} args={[1, 0.42, 0.42]} position={[-2, 0, 0]}>
        <meshStandardMaterial 
          color={progress >= 1 ? '#10B981' : '#6366F1'} 
          emissive={progress >= 1 ? '#10B981' : '#6366F1'}
          emissiveIntensity={0.5}
        />
      </Box>

      {/* Label */}
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.3}
        color="#334155"
        anchorX="center"
        anchorY="middle"
      >
        {Math.round(progress * 100)}% Complete
      </Text>
    </group>
  );
};

const TaskProgress3D = () => {
  return (
    <div className="w-full h-32 relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <ProgressBar />
        </Float>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default TaskProgress3D;
