import { notFound } from "next/navigation"

import { LandscapePrompt } from "@/components/landscape-prompt"
import { InnovativeContact } from "@/components/preview/sections/contact/innovative"
import { ModernContact } from "@/components/preview/sections/contact/modern"
import { ProfessionalContact } from "@/components/preview/sections/contact/professional"
import { InnovativeExperience } from "@/components/preview/sections/experience/innovative"
import { ModernExperience } from "@/components/preview/sections/experience/modern"
import { ProfessionalExperience } from "@/components/preview/sections/experience/professional"
import { InnovativeFaq } from "@/components/preview/sections/faq/innovative"
import { ModernFaq } from "@/components/preview/sections/faq/modern"
import { ProfessionalFaq } from "@/components/preview/sections/faq/professional"
import { InnovativeProfile } from "@/components/preview/sections/profile/innovative"
import { ModernProfile } from "@/components/preview/sections/profile/modern"
import { ProfessionalProfile } from "@/components/preview/sections/profile/professional"
import { InnovativeProjects } from "@/components/preview/sections/projects/innovative"
import { ModernProjects } from "@/components/preview/sections/projects/modern"
import { ProfessionalProjects } from "@/components/preview/sections/projects/professional"
import { InnovativeSkills } from "@/components/preview/sections/skills/innovative"
import { ModernSkills } from "@/components/preview/sections/skills/modern"
import { ProfessionalSkills } from "@/components/preview/sections/skills/professional"
import { InnovativeStrongPoints } from "@/components/preview/sections/strong-points/innovative"
import { ModernStrongPoints } from "@/components/preview/sections/strong-points/modern"
import { ProfessionalStrongPoints } from "@/components/preview/sections/strong-points/professional"
import { DEFAULT_SETTINGS } from "@/constants/vscode-config"
import { ThemeProvider } from "@/contexts/theme-context"

const SECTIONS = ["profile", "projects", "skills", "contact", "strong-points", "faq", "experience"]
const THEMES = ["modern", "innovative", "professional"]

const SECTION_MAP: Record<string, Record<string, React.ComponentType>> = {
  profile: {
    modern: ModernProfile,
    innovative: InnovativeProfile,
    professional: ProfessionalProfile,
  },
  projects: {
    modern: ModernProjects,
    innovative: InnovativeProjects,
    professional: ProfessionalProjects,
  },
  skills: { modern: ModernSkills, innovative: InnovativeSkills, professional: ProfessionalSkills },
  contact: {
    modern: ModernContact,
    innovative: InnovativeContact,
    professional: ProfessionalContact,
  },
  "strong-points": {
    modern: ModernStrongPoints,
    innovative: InnovativeStrongPoints,
    professional: ProfessionalStrongPoints,
  },
  faq: { modern: ModernFaq, innovative: InnovativeFaq, professional: ProfessionalFaq },
  experience: {
    modern: ModernExperience,
    innovative: InnovativeExperience,
    professional: ProfessionalExperience,
  },
}

export const dynamic = "force-static"

export function generateStaticParams() {
  const params = []
  for (const section of SECTIONS) {
    for (const theme of THEMES) {
      params.push({ section, theme })
    }
  }
  return params
}

export default async function ScreenshotPage({
  params,
}: {
  params: Promise<{ section: string; theme: string }>
}) {
  const { section, theme } = await params

  const Section = SECTION_MAP[section]?.[theme]

  if (!Section) {
    notFound()
  }

  return (
    <ThemeProvider settings={DEFAULT_SETTINGS}>
      <div data-ready="true">
        <LandscapePrompt />
        <Section />
      </div>
    </ThemeProvider>
  )
}
