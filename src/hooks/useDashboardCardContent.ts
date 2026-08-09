import { useMemo } from 'react'
import { useTranslation } from '@/i18n/useTranslation'
import { sections } from '@/content/sections'
import { projects } from '@/content/projects'

export interface DashboardCardContent {
  title: string
  body: string
  chips?: string[]
}

/**
 * Resolves which portfolio content the planet-surface "dashboard peek" cards
 * show (skills/project/experience). Kept outside src/scenes/ so the content
 * selection/shaping logic stays independent of the 3D layer — PlanetDashboards.tsx
 * only handles where to place the already-resolved cards in 3D space.
 */
export function useDashboardCardContent(): DashboardCardContent[] {
  const { t, language } = useTranslation()

  return useMemo(() => {
    const skillsSection = sections.find((s) => s.id === 'skills')
    const projectsSection = sections.find((s) => s.id === 'projects')
    const experienceSection = sections.find((s) => s.id === 'experience')
    const firstProject = projects[0]

    return [
      {
        title: t('nav.skills'),
        body: skillsSection ? skillsSection.shortPreview[language] : '',
        chips: (firstProject?.stack ?? []).slice(0, 4),
      },
      {
        title: firstProject?.name ?? t('nav.projects'),
        body: firstProject
          ? firstProject.description[language]
          : (projectsSection?.shortPreview[language] ?? ''),
      },
      {
        title: t('nav.experience'),
        body: experienceSection ? experienceSection.shortPreview[language] : '',
      },
    ]
  }, [t, language])
}
