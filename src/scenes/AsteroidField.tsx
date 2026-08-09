import { useTexture } from '@react-three/drei'
import { SRGBColorSpace, type Texture } from 'three'
import { sections } from '@/content/sections'
import { Asteroid } from './Asteroid'
import moonTextureUrl from '@/assets/textures/moon/moon_2k.jpg'

function configureMoonTexture(texture: Texture) {
  texture.colorSpace = SRGBColorSpace
}

export function AsteroidField() {
  const moonMap = useTexture(moonTextureUrl, configureMoonTexture)

  return (
    <>
      {sections.map((section) => (
        <Asteroid key={section.id} section={section} moonMap={moonMap} />
      ))}
    </>
  )
}
