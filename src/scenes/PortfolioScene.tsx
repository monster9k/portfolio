import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { Planet } from './Planet'
import { Starfield } from './Starfield'
import { Nebula } from './Nebula'
import { SpaceDust } from './SpaceDust'
import { OrbitRings } from './OrbitRings'
import { AsteroidField } from './AsteroidField'
import { useResponsiveQuality } from '@/hooks/useResponsiveQuality'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const CAMERA_POSITION: [number, number, number] = [0, 0.5, 6]

export function PortfolioScene() {
  const { dpr } = useResponsiveQuality()
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <Canvas camera={{ position: CAMERA_POSITION, fov: 45 }} dpr={dpr} gl={{ antialias: true }}>
      <color attach="background" args={['#05060a']} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 3, 5]} intensity={2} color="#fff2e0" />
      <Suspense fallback={null}>
        <Planet />
        <Starfield />
        <Nebula />
        <SpaceDust />
        <OrbitRings />
        <AsteroidField />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.5}
        minDistance={3.5}
        maxDistance={9}
        autoRotate={!prefersReducedMotion}
        autoRotateSpeed={0.15}
      />
    </Canvas>
  )
}
