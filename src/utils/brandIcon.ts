import type { IconType } from 'react-icons'
import {
  SiAngular,
  SiBootstrap,
  SiCplusplus,
  SiCss,
  SiDart,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGitlab,
  SiGooglegemini,
  SiGraphql,
  SiHackerrank,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiKotlin,
  SiKubernetes,
  SiMdx,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiRedux,
  SiSass,
  SiSwift,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVite,
  SiVuedotjs,
  SiWebpack,
} from 'react-icons/si'

/**
 * Name -> brand icon lookup for tech-stack/skill pills and achievement
 * issuers. Only includes entries verified to exist in the installed
 * react-icons/si set — an inaccurate or missing icon is worse than no icon,
 * so unmatched names fall back to plain text rather than guessing.
 */
const BRAND_ICON_MAP: Record<string, IconType> = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  python: SiPython,
  react: SiReact,
  'three.js': SiThreedotjs,
  'node.js': SiNodedotjs,
  'next.js': SiNextdotjs,
  git: SiGit,
  gitlab: SiGitlab,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  figma: SiFigma,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  nestjs: SiNestjs,
  redis: SiRedis,
  mdx: SiMdx,
  tailwindcss: SiTailwindcss,
  'tailwind css': SiTailwindcss,
  vite: SiVite,
  'c++': SiCplusplus,
  firebase: SiFirebase,
  flutter: SiFlutter,
  dart: SiDart,
  kotlin: SiKotlin,
  swift: SiSwift,
  html5: SiHtml5,
  html: SiHtml5,
  css3: SiCss,
  css: SiCss,
  redux: SiRedux,
  'vue.js': SiVuedotjs,
  vue: SiVuedotjs,
  angular: SiAngular,
  graphql: SiGraphql,
  express: SiExpress,
  jest: SiJest,
  webpack: SiWebpack,
  sass: SiSass,
  bootstrap: SiBootstrap,
  php: SiPhp,
  hackerrank: SiHackerrank,
  prisma: SiPrisma,
  'google gemini': SiGooglegemini,
}

/** Below this key length, only exact matches are considered — short keys (e.g. "git", "php") substring-matching inside unrelated words is how you get a Go logo on "Algorithms". */
const MIN_SUBSTRING_KEY_LENGTH = 4

/**
 * Best-effort brand icon lookup for a tech/tool/issuer name. Tries an exact
 * (case-insensitive) match first, then falls back to the longest mapped key
 * contained in the name (so "Three.js / React Three Fiber" resolves to the
 * Three.js mark, not React). Returns undefined when nothing matches —
 * callers should render plain text in that case, not a guessed icon.
 */
export function getBrandIcon(name: string): IconType | undefined {
  const normalized = name.trim().toLowerCase()
  const exact = BRAND_ICON_MAP[normalized]
  if (exact) return exact

  const bySpecificity = Object.entries(BRAND_ICON_MAP)
    .filter(([key]) => key.length >= MIN_SUBSTRING_KEY_LENGTH)
    .sort((a, b) => b[0].length - a[0].length)

  return bySpecificity.find(([key]) => normalized.includes(key))?.[1]
}
