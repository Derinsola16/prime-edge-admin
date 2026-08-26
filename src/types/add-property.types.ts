import { ProductStatus, ProductType } from "@/types/property.types"

export type PaymentPlanOption = "one_time" | "12_months" | "24_months"

export type PendingImage = {
  file: File
  previewUrl: string
}

export type AddPropertyFormValues = {
  // Section A - Basic Info
  projectId: string
  title: string
  type: ProductType | ""
  description: string
  bedrooms: string
  bathrooms: string
  toilets: string
  parkingSpaces: string
  floor: string
  totalFloors: string
  size: string
  isFeatured: boolean

  // Section B - Pricing
  price: string
  priceLabel: string
  serviceCharge: string
  paymentPlans: PaymentPlanOption[]

  // Section C - Media
  virtualTourUrl: string

  // Section D - Features
  features: string[]

  // Section E - Review & Publish
  status: ProductStatus
  publishNow: boolean
}

export type AddPropertyStepId =
  | "basic-info"
  | "pricing"
  | "media"
  | "features"
  | "review-publish"

export const ADD_PROPERTY_STEPS: {
  id: AddPropertyStepId
  letter: string
  label: string
}[] = [
  { id: "basic-info", letter: "A", label: "Basic Info" },
  { id: "pricing", letter: "B", label: "Pricing" },
  { id: "media", letter: "C", label: "Media" },
  { id: "features", letter: "D", label: "Features" },
  { id: "review-publish", letter: "E", label: "Review & Publish" },
]

export const PAYMENT_PLAN_OPTIONS: {
  value: PaymentPlanOption
  name: string
  duration?: string
}[] = [
  { value: "one_time", name: "One Time Payment", duration: undefined },
  { value: "12_months", name: "12 Months Payment Plan", duration: "12 months" },
  { value: "24_months", name: "24 Months Payment Plan", duration: "24 months" },
]
