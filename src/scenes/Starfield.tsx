import { Stars } from '@react-three/drei'

export function Starfield() {
  return <Stars radius={80} depth={40} count={4000} factor={3} saturation={0} fade speed={0.5} />
}
