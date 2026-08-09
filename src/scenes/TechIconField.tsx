import { SiDocker, SiNodedotjs, SiReact, SiTailwindcss, SiTypescript, SiVite } from 'react-icons/si'
import type { IconType } from 'react-icons'
import { techIcons, type TechIconSlug } from '@/content/techIcons'
import { useTranslation } from '@/i18n/useTranslation'
import { TechIcon } from './TechIcon'

const ICON_MAP: Record<TechIconSlug, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  vite: SiVite,
  node: SiNodedotjs,
  docker: SiDocker,
  tailwind: SiTailwindcss,
}

export function TechIconField() {
  const { t } = useTranslation()

  return (
    <>
      {techIcons.map((tech) => (
        <TechIcon key={tech.id} orbit={tech.orbit} label={t(tech.labelKey)} Icon={ICON_MAP[tech.id]} />
      ))}
    </>
  )
}
