"use client"

import { getPreviewType } from "@/lib/file-utils"
import type { PreviewTheme } from "@/types"

import { InnovativeContact } from "./sections/contact/innovative"
import { ModernContact } from "./sections/contact/modern"
import { ProfessionalContact } from "./sections/contact/professional"
import { InnovativeExperience } from "./sections/experience/innovative"
import { ModernExperience } from "./sections/experience/modern"
import { ProfessionalExperience } from "./sections/experience/professional"
import { InnovativeFaq } from "./sections/faq/innovative"
import { ModernFaq } from "./sections/faq/modern"
import { ProfessionalFaq } from "./sections/faq/professional"
import { InnovativeProfile } from "./sections/profile/innovative"
import { ModernProfile } from "./sections/profile/modern"
import { ProfessionalProfile } from "./sections/profile/professional"
import { InnovativeProjects } from "./sections/projects/innovative"
import { ModernProjects } from "./sections/projects/modern"
import { ProfessionalProjects } from "./sections/projects/professional"
import { InnovativeReadme } from "./sections/readme/innovative"
import { ModernReadme } from "./sections/readme/modern"
import { ProfessionalReadme } from "./sections/readme/professional"
import { InnovativeSkills } from "./sections/skills/innovative"
import { ModernSkills } from "./sections/skills/modern"
import { ProfessionalSkills } from "./sections/skills/professional"
import { InnovativeStrongPoints } from "./sections/strong-points/innovative"
import { ModernStrongPoints } from "./sections/strong-points/modern"
import { ProfessionalStrongPoints } from "./sections/strong-points/professional"

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
  readme: { modern: ModernReadme, innovative: InnovativeReadme, professional: ProfessionalReadme },
}

interface PreviewPanelProps {
  fileName: string
  content: string
  theme?: PreviewTheme
}

export function PreviewPanel({ fileName, content, theme = "modern" }: PreviewPanelProps) {
  const previewType = getPreviewType(fileName)
  const Section = SECTION_MAP[previewType]?.[theme]

  if (Section) {
    return <Section />
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-4xl mx-auto p-8 bg-slate-900/50 border border-slate-800 backdrop-blur rounded-xl shadow-sm">
        <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
          {content}
        </pre>
      </div>
    </div>
  )
}
