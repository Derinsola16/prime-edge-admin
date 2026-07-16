export type PropertyCategory = "residential" | "commercial" | "mixed_use"

export type PaymentPlanOption = "one_time" | "12_months" | "24_months"

export type AddPropertyFormValues = {
  // Section A - Basic Info
  property_name: string
  location: string
  project_type: string
  category: PropertyCategory
  description: string
  duration: string
  bedrooms: string
  units: string
  projected_irr: string
  feature_property: "yes" | "no"
  payment_plan: PaymentPlanOption[]
  full_address: string

  // Section B - Finance
  property_price: string
  min_investment: string
  finance_projected_irr: string
  exp_cash_yield: string

  // Section C - Media & Docs
  virtual_tour_link: string

  // Section D - Amenities
  amenities: string[]
}

export type AddPropertyStepId =
  | "basic-info"
  | "finance"
  | "media-docs"
  | "amenities"
  | "review-publish"

export const ADD_PROPERTY_STEPS: {
  id: AddPropertyStepId
  letter: string
  label: string
}[] = [
  { id: "basic-info", letter: "A", label: "Basic Info" },
  { id: "finance", letter: "B", label: "Finance" },
  { id: "media-docs", letter: "C", label: "Media & Docs" },
  { id: "amenities", letter: "D", label: "Amenities" },
  { id: "review-publish", letter: "E", label: "Review & Publish" },
]
