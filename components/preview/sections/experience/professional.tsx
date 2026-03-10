"use client"

import { CareerTimeline } from "@/components/career-timeline/career-timeline"
import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useExperienceData } from "@/hooks/use-experience-data"

export function ProfessionalExperience() {
  const { data, loading, error } = useExperienceData()

  if (loading) return <LoadingState />
  if (error || !data) return <ErrorState message={error ?? undefined} />

  return <CareerTimeline experiences={data} variant="professional" />
}
