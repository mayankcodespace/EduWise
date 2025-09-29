import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import FloatingGeometry from './FloatingGeometry';

interface Scene3DProps {
  className?: string;
  children?: React.ReactNode;
}

const Scene3D = ({ className = "", children }: Scene3DProps) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} color="#b84bf5" intensity={0.5} />
          <pointLight position={[10, -10, 5]} color="#3b82f6" intensity={0.5} />
          
          <Stars radius={300} depth={50} count={1000} factor={4} saturation={0} fade />
          
          <FloatingGeometry position={[-4, 2, -2]} type="sphere" color="#b84bf5" scale={0.8} />
          <FloatingGeometry position={[4, -2, -1]} type="box" color="#3b82f6" scale={0.6} />
          <FloatingGeometry position={[0, 3, -3]} type="torus" color="#06b6d4" scale={0.7} />
          <FloatingGeometry position={[-3, -3, -4]} type="sphere" color="#8b5cf6" scale={0.5} />
          <FloatingGeometry position={[3, 1, -2]} type="box" color="#10b981" scale={0.4} />
          
          <Environment preset="night" />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;