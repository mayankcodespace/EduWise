import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Float, Sphere, Box, Torus } from '@react-three/drei';

interface FloatingGeometryProps {
  position: [number, number, number];
  type: 'sphere' | 'box' | 'torus';
  color?: string;
  scale?: number;
}

const FloatingGeometry = ({ position, type, color = '#b84bf5', scale = 1 }: FloatingGeometryProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  const GeometryComponent = () => {
    switch (type) {
      case 'sphere':
        return <Sphere args={[1, 32, 32]} />;
      case 'box':
        return <Box args={[1.5, 1.5, 1.5]} />;
      case 'torus':
        return <Torus args={[1, 0.4, 16, 32]} />;
      default:
        return <Sphere args={[1, 32, 32]} />;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <GeometryComponent />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.8}
          roughness={0.1}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
};

export default FloatingGeometry;