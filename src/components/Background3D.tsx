import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTasks } from '../context/TaskContext';

const FloatingSphere = ({ color, position, size, speed, distort, theme }: { color: string, position: [number, number, number], size: number, speed: number, distort: number, theme: 'light' | 'dark' }) => {
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
          metalness={0.6}
          roughness={0.2}
          opacity={theme === 'dark' ? 0.4 : 0.15}
          transparent
          emissive={color}
          emissiveIntensity={theme === 'dark' ? 0.8 : 0.2}
        />
      </Sphere>
    </Float>
  );
};

const Particles = ({ count = 100 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return p;
  }, [count]);

  return (
    <Points positions={points}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
};

const Background3DContents = ({ offset }: { offset: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { theme } = useTasks();
  
  useFrame((state) => {
    if (groupRef.current) {
      // Smoothly interpolate to the target offset.
      // User clarified "move with the position of the cards" 
      // even though they previously said "opposite side". 
      // We'll make it move TOWARDS the concentration of cards to "follow" them.
      const targetX = offset * 6; // Increased multiplier for more pronounced movement
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.03);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={theme === 'dark' ? 0.8 : 0.4} />
      <pointLight position={[10, 10, 10]} intensity={theme === 'dark' ? 1.5 : 0.5} />
      <FloatingSphere theme={theme} color="#6366f1" position={[-6, 3, -5]} size={2} speed={1.2} distort={0.3} />
      <FloatingSphere theme={theme} color="#ec4899" position={[6, -3, -6]} size={2.5} speed={0.8} distort={0.4} />
      <FloatingSphere theme={theme} color="#8b5cf6" position={[0, -5, -4]} size={1.8} speed={1.5} distort={0.5} />
      <FloatingSphere theme={theme} color="#10b981" position={[3, 4, -7]} size={1.5} speed={2} distort={0.2} />
      <Particles count={150} />
    </group>
  );
};

const Background3D = ({ offset = 0 }: { offset?: number }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Background3DContents offset={offset} />
      </Canvas>
    </div>
  );
};

export default Background3D;
