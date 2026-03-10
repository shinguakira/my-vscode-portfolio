import type {
  ChangelogResponse,
  ContactResponse,
  ExperienceResponse,
  FaqResponse,
  LinksResponse,
  ProfileResponse,
  ProjectsResponse,
  SkillsResponse,
  StrongPointsResponse,
} from "@shinguakira/portfolio-api-types"

import { fetchPortfolioApi } from "./client"

export const fetchProfile = (locale: string, signal?: AbortSignal) =>
  fetchPortfolioApi<ProfileResponse>("profile", locale, signal)

export const fetchSkills = (locale: string, signal?: AbortSignal) =>
  fetchPortfolioApi<SkillsResponse>("skills", locale, signal)

export const fetchProjects = (locale: string, signal?: AbortSignal) =>
  fetchPortfolioApi<ProjectsResponse>("projects", locale, signal)

export const fetchExperience = (locale: string, signal?: AbortSignal) =>
  fetchPortfolioApi<ExperienceResponse>("experience", locale, signal)

export const fetchFaqs = (locale: string, signal?: AbortSignal) =>
  fetchPortfolioApi<FaqResponse>("faqs", locale, signal)

export const fetchStrongPoints = (locale: string, signal?: AbortSignal) =>
  fetchPortfolioApi<StrongPointsResponse>("strong-points", locale, signal)

export const fetchContact = (signal?: AbortSignal) =>
  fetchPortfolioApi<ContactResponse>("contact", undefined, signal)

export const fetchChangelog = (locale: string, signal?: AbortSignal) =>
  fetchPortfolioApi<ChangelogResponse>("changelogs", locale, signal)

export const fetchLinks = (signal?: AbortSignal) =>
  fetchPortfolioApi<LinksResponse>("links", undefined, signal)
