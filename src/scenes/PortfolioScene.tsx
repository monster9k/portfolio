import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { Planet } from './Planet'
import { Starfield } from './Starfield'
import { Nebula } from './Nebula'
import { SpaceDust } from './SpaceDust'
import { OrbitRings } from './OrbitRings'
import { AsteroidField } from './AsteroidField'
import { TechIconField } from './TechIconField'
import { useResponsiveQuality } from '@/hooks/useResponsiveQuality'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useSceneStore } from '@/store/useSceneStore'

const CAMERA_POSITION: [number, number, number] = [0, 0.5, 6]

export function PortfolioScene() {
  const { dpr, isLowPower } = useResponsiveQuality()
  const prefersReducedMotion = usePrefersReducedMotion()
  const setSelected = useSceneStore((s) => s.setSelected)

  return (
    <Canvas
      camera={{ position: CAMERA_POSITION, fov: 45 }}
      dpr={dpr}
      gl={{ antialias: true }}
      onPointerMissed={() => setSelected(null)}
    >
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
        <TechIconField isLowPower={isLowPower} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.5}
        minDistance={3.5}
        maxDistance={22}
        autoRotate={!prefersReducedMotion}
        autoRotateSpeed={0.15}
      />
      {!isLowPower && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.25} luminanceSmoothing={0.25} intensity={0.4} radius={0.35} />
          <Vignette offset={0.25} darkness={0.9} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
