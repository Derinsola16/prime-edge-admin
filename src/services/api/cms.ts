import { ApiSuccessResponse } from "@/types/api.types"
import {
  ICmsFaq,
  ContactInfo,
  ICmsMetrics,
  ICmsProject,
  ICmsTestimonial,
  TestimonialStatus,
} from "@/types/cms.types"

// TODO: replace with real API calls once the backend endpoint is ready.
// import { http } from "@/utils/axios"

const MOCK_METRICS: ICmsMetrics = {
  total_projects: 6,
  completed_projects: 2,
  ongoing_projects: 10,
  faqs: 21,
  testimonials: 12,
  contact_info: 4,
}

const MOCK_PROJECTS: ICmsProject[] = [
  {
    id: "cp1",
    name: "Ivie Towers",
    hero_image_url: "/assets/images/properties/property-1.png",
    location: "The Haven • Victoria Island, Lagos Nigeria",
    units_sold: 5,
    total_units: 22,
    status: "construction",
    construction_progress: 15,
  },
  {
    id: "cp2",
    name: "The Haven",
    hero_image_url: "/assets/images/properties/property-2.png",
    location: "The Haven • Victoria Island, Lagos Nigeria",
    units_sold: 5,
    total_units: 22,
    status: "construction",
    construction_progress: 75,
  },
  {
    id: "cp3",
    name: "Baker's Court",
    hero_image_url: "/assets/images/properties/property-1.png",
    location: "The Haven • Victoria Island, Lagos Nigeria",
    units_sold: 5,
    total_units: 22,
    status: "completed",
    sold_out: true,
  },
  {
    id: "cp4",
    name: "Hampton Bay",
    hero_image_url: "/assets/images/properties/property-2.png",
    location: "The Haven • Victoria Island, Lagos Nigeria",
    units_sold: 5,
    total_units: 22,
    status: "construction",
    construction_progress: 75,
  },
  {
    id: "cp5",
    name: "The Alfred",
    hero_image_url: "/assets/images/properties/property-1.png",
    location: "The Haven • Victoria Island, Lagos Nigeria",
    units_sold: 5,
    total_units: 22,
    status: "construction",
    construction_progress: 75,
  },
]

const MOCK_CONTACT_INFO: ContactInfo = {
  phone_number: "+1 (555) 012-3456",
  whatsapp_number: "+1 (555) 012-3456",
  support_email: "support@primeedge.com",
  company_email: "info@primeedge.com",
  address: "100 Crystal Way, Suite 500\nFinancial District, NY 10004",
}

const MOCK_TESTIMONIALS: ICmsTestimonial[] = MOCK_PROJECTS.flatMap(project =>
  [1, 2, 3].map((n, i) => ({
    id: `${project.id}-t${n}`,
    project_id: project.id,
    project_name: project.name,
    full_name: "Sarah Jenkins",
    occupation: "Chief Operations, Apex",
    testimony:
      "The transparency provided by the Operational Crystal dashboard has revolutionized how we report to our stakeholders. Total clarity.",
    status: (i === 0 ? "new" : "approved") as TestimonialStatus,
  }))
)

const MOCK_FAQS: ICmsFaq[] = [
  {
    id: "f1",
    category: "General",
    question: "What is Prime Edge?",
    answer:
      "Prime Edge is a real estate development and investment platform focused on structuring and delivering joint venture projects with landowners, capital partners, and strategic off-takers.",
  },
  {
    id: "f2",
    category: "General",
    question: "Where does Prime Edge operate?",
    answer: "Prime Edge currently operates in Lagos and select high-growth urban locations in Nigeria.",
  },
  {
    id: "f3",
    category: "General",
    question: "Does Prime Edge buy land outright?",
    answer:
      "No. Prime Edge primarily partners with landowners through joint development or structured arrangements rather than outright land purchases.",
  },
  {
    id: "f4",
    category: "Landowner Partnerships",
    question: "What type of landowners does Prime Edge work with?",
    answer: "We work with landowners who have clear title, defined decision authority, and an interest in structured development partnerships.",
  },
  {
    id: "f5",
    category: "Landowner Partnerships",
    question: "How does a landowner partnership work?",
    answer: "The landowner contributes land, Prime Edge leads development and project structuring, and profits are shared based on an agreed framework.",
  },
  {
    id: "f6",
    category: "Capital / Project Funding",
    question: "Who can invest with Prime Edge?",
    answer: "High-net worth individuals, families, corporates, and structured investment entities.",
  },
  {
    id: "f7",
    category: "Capital / Project Funding",
    question: "What is the typical investment duration?",
    answer: "Project tenors typically range from 18 to 36 months, depending on asset type.",
  },
]

export async function getCmsMetrics(): Promise<ApiSuccessResponse<ICmsMetrics>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: MOCK_METRICS }
}

export async function getCmsProjects(): Promise<
  ApiSuccessResponse<{ items: ICmsProject[] }>
> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_PROJECTS } }
}

export async function getContactInfo(): Promise<ApiSuccessResponse<ContactInfo>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: MOCK_CONTACT_INFO }
}

export async function updateContactInfo(
  payload: ContactInfo
): Promise<ApiSuccessResponse<ContactInfo>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  Object.assign(MOCK_CONTACT_INFO, payload)
  return { message: "ok", data: MOCK_CONTACT_INFO }
}

export async function getTestimonials(): Promise<
  ApiSuccessResponse<{ items: ICmsTestimonial[] }>
> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_TESTIMONIALS } }
}

export async function updateTestimonialStatus(payload: {
  id: string
  status: TestimonialStatus
}): Promise<ApiSuccessResponse<{ id: string }>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  const testimonial = MOCK_TESTIMONIALS.find(t => t.id === payload.id)
  if (testimonial) testimonial.status = payload.status
  return { message: "ok", data: { id: payload.id } }
}

export async function submitTestimonial(payload: {
  full_name: string
  occupation: string
  project_id: string
  testimony: string
}): Promise<ApiSuccessResponse<{ id: string }>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  const project = MOCK_PROJECTS.find(p => p.id === payload.project_id)
  MOCK_TESTIMONIALS.unshift({
    id: `t${Date.now()}`,
    project_id: payload.project_id,
    project_name: project?.name ?? "",
    full_name: payload.full_name,
    occupation: payload.occupation,
    testimony: payload.testimony,
    status: "new",
  })
  return { message: "ok", data: { id: `t${Date.now()}` } }
}

export async function getFaqs(): Promise<ApiSuccessResponse<{ items: ICmsFaq[] }>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_FAQS } }
}

export async function createFaq(payload: {
  question: string
  answer: string
  project_id?: string
}): Promise<ApiSuccessResponse<ICmsFaq>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  const faq: ICmsFaq = { id: `f${Date.now()}`, category: "General", ...payload }
  MOCK_FAQS.unshift(faq)
  return { message: "ok", data: faq }
}

export async function createCmsProject(
  payload: Record<string, unknown>
): Promise<ApiSuccessResponse<{ id: string }>> {
  await new Promise(resolve => setTimeout(resolve, 500))
  void payload
  return { message: "ok", data: { id: `cp${Date.now()}` } }
}
