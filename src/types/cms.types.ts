export type CmsProjectStatus = "construction" | "completed" | "draft"

export type ICmsProject = {
  id: string
  name: string
  hero_image_url: string
  location: string
  units_sold: number
  total_units: number
  status: CmsProjectStatus
  construction_progress?: number
  sold_out?: boolean
}

export type ICmsMetrics = {
  total_projects: number
  completed_projects: number
  ongoing_projects: number
  faqs: number
  testimonials: number
  contact_info: number
}

export type ContactInfo = {
  phone_number: string
  whatsapp_number: string
  support_email: string
  company_email: string
  address: string
}

export type TestimonialStatus = "approved" | "rejected" | "new"

export type ICmsTestimonial = {
  id: string
  project_id: string
  project_name: string
  full_name: string
  occupation: string
  testimony: string
  status: TestimonialStatus
}

export type ICmsFaq = {
  id: string
  category: string
  question: string
  answer: string
  project_id?: string
}
