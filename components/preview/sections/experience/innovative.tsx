"use client"

import { CareerTimeline } from "@/components/career-timeline/career-timeline"
import { getCareerProjects } from "@/constants/career-data"
import { useLocale } from "@/contexts/locale-context"

export function InnovativeExperience() {
  const locale = useLocale()
  const careerProjects = getCareerProjects(locale)

  return <CareerTimeline projects={careerProjects} variant="innovative" />
}
