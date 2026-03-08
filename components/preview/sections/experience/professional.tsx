"use client"

import { CareerTimeline } from "@/components/career-timeline/career-timeline"
import { getCareerProjects } from "@/constants/career-data"
import { useLocale } from "@/contexts/locale-context"

export function ProfessionalExperience() {
  const locale = useLocale()
  const careerProjects = getCareerProjects(locale)

  return <CareerTimeline projects={careerProjects} variant="professional" />
}
