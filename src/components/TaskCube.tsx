'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, RoundedBox, MeshWobbleMaterial, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useTasks } from '../context/TaskContext';

const Cube = () => {
  const { tasks } = useTasks();
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [lastCompletedCount, setLastCompletedCount] = useState(0);
  const [pulse, setPulse] = useState(0);

  const completedCount = useMemo(() => tasks.filter(t => t.status === 'done').length, [tasks]);

  useEffect(() => {
    if (completedCount > lastCompletedCount) {
      setPulse(1);
      const timer = setTimeout(() => setPulse(0), 1000);
      return () => clearTimeout(timer);
    }
    setLastCompletedCount(completedCount);
  }, [completedCount, lastCompletedCount]);

  useFrame((state) => {
    if (meshRef.current) {
      if (hovered) {
        // Follow mouse movement when hovered
        const { x, y } = state.mouse;
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y * 0.5, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.5, 0.1);
      } else {
        // Normal rotation
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
      }
      
      if (pulse > 0) {
        const s = 1 + Math.sin(state.clock.getElapsedTime() * 10) * 0.2 * pulse;
        meshRef.current.scale.set(s, s, s);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const color = useMemo(() => {
    if (pulse > 0) return '#10B981'; // Green pulse
    return '#6366F1'; // Indigo default
  }, [pulse]);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <RoundedBox
        ref={meshRef}
        args={[1.5, 1.5, 1.5]}
        radius={0.2}
        smoothness={4}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <MeshWobbleMaterial 
          color={hovered ? '#4F46E5' : color} 
          factor={pulse > 0 ? 1 : 0.2} 
          speed={2} 
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>
    </Float>
  );
};

const TaskCube = () => {
  return (
    <div className="w-full h-40 relative group cursor-pointer">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Cube />
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default TaskCube;
