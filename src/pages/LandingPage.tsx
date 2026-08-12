import '@/pages/landing/landing.css'
import { LandingNavbar } from '@/pages/landing/LandingNavbar'
import { HeroSection } from '@/pages/landing/HeroSection'
import { AboutSection } from '@/pages/landing/AboutSection'
import { EducationSection } from '@/pages/landing/EducationSection'
import { AchievementsSection } from '@/pages/landing/AchievementsSection'
import { ProjectsSection } from '@/pages/landing/ProjectsSection'
import { ContactSection } from '@/pages/landing/ContactSection'
import { SiteFooter } from '@/pages/landing/SiteFooter'

export function LandingPage() {
  return (
    <div className="landing-page">
      <LandingNavbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <AchievementsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
