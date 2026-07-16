import { WizardStep } from "@/components/shared/wizard-step-indicator"

export type AddCmsProjectFormValues = {
  project_name: string
  tagline: string
  estimated_delivery: string
  location: string
  overview: string
  category: "residential" | "commercial" | "mixed_use"
  full_address: string
  about_project: string
  heading: string
  value_tagline: string
  subtext: string
  bullet_points: string
  amenities_description: string
  map_address: string
  location_description: string
}

export const ADD_CMS_PROJECT_STEPS: WizardStep[] = [
  { id: "basic-info", letter: "A", label: "Basic Info" },
  { id: "media", letter: "B", label: "Media Gallery" },
  { id: "content", letter: "C", label: "Content" },
  { id: "amenities", letter: "D", label: "Amenities" },
  { id: "location", letter: "E", label: "Location" },
  { id: "done", letter: "F", label: "Published" },
]
