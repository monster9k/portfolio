import { sections } from '@/content/sections'
import { Asteroid } from './Asteroid'

export function AsteroidField() {
  return (
    <>
      {sections.map((section) => (
        <Asteroid key={section.id} section={section} />
      ))}
    </>
  )
}
