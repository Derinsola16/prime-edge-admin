import { isAxiosError } from "axios"

import { http } from "@/utils/axios"
import { ApiSuccessResponse, PaginatedResponse } from "@/types/api.types"
import { CmsProjectStatusInput } from "@/types/add-cms-project.types"
import {
  ICmsFaq,
  ContactInfo,
  ICmsMetrics,
  ICmsProject,
  ICmsTestimonial,
  TestimonialStatus,
} from "@/types/cms.types"

// ── Projects ─────────────────────────────────────────────────────────────

type RawProjectImage = { _id?: string; url: string; publicId: string; caption?: string }

type RawProject = {
  _id: string
  title: string
  slug: string
  status: CmsProjectStatusInput
  type: "residential" | "commercial" | "mixed_use" | "land"
  description: string
  shortDescription?: string
  location: { address: string; city?: string; state?: string; country?: string }
  coverImage?: string
  images: RawProjectImage[]
  totalUnits?: number
  constructionProgress?: number
  soldUnits?: number
  isFeatured: boolean
  isPublished: boolean
  tagline?: string
  estimatedDelivery?: string
  locationLabel?: string
  heading?: string
  valueTagline?: string
  subtext?: string
  bulletPoints?: string
  amenitiesDescription?: string
  mapAddress?: string
  locationDescription?: string
  createdAt: string
  updatedAt: string
}

// Cloudinary URLs uploaded before the backend was fixed to return `secure_url`
// are stored as `http://`, which `next/image`'s remote-pattern allowlist (https-only)
// rejects outright. Normalize defensively so old records don't crash the page.
function toSecureUrl(url: string): string {
  return url.replace(/^http:\/\//, "https://")
}

function formatProjectLocation(raw: RawProject): string {
  if (raw.locationLabel) return raw.locationLabel
  if (raw.location.city && raw.location.state) return `${raw.location.city}, ${raw.location.state}`
  return raw.location.address
}

function mapCmsProject(raw: RawProject): ICmsProject {
  const totalUnits = raw.totalUnits ?? 0
  const unitsSold = raw.soldUnits ?? 0

  return {
    id: raw._id,
    name: raw.title,
    hero_image_url: toSecureUrl(raw.coverImage ?? raw.images?.[0]?.url ?? ""),
    location: formatProjectLocation(raw),
    units_sold: unitsSold,
    total_units: totalUnits,
    status: !raw.isPublished ? "draft" : raw.status === "completed" ? "completed" : "construction",
    construction_progress: raw.constructionProgress,
    sold_out: totalUnits > 0 && unitsSold >= totalUnits,
  }
}

export async function getCmsProjects(): Promise<ApiSuccessResponse<{ items: ICmsProject[] }>> {
  const res = await http.get<PaginatedResponse<RawProject>>("/projects/admin", {
    params: { limit: 100 },
  })
  return { message: "ok", data: { items: res.data.data.map(mapCmsProject) } }
}

export type CreateCmsProjectPayload = {
  title: string
  description: string
  shortDescription?: string
  status: CmsProjectStatusInput
  type: "residential" | "commercial" | "mixed_use" | "land"
  location: { address: string; city?: string; state?: string; country?: string }
  constructionProgress?: number
  isPublished: boolean
  tagline?: string
  estimatedDelivery?: string
  locationLabel?: string
  heading?: string
  valueTagline?: string
  subtext?: string
  bulletPoints?: string
  amenitiesDescription?: string
  mapAddress?: string
  locationDescription?: string
}

export async function createCmsProject(
  payload: CreateCmsProjectPayload
): Promise<ApiSuccessResponse<{ id: string }>> {
  const res = await http.post<ApiSuccessResponse<RawProject>>("/projects/admin", payload)
  return { message: res.data.message, data: { id: res.data.data._id } }
}

export async function uploadCmsProjectCover(id: string, file: File): Promise<void> {
  const formData = new FormData()
  formData.append("image", file)
  await http.put(`/projects/admin/${id}/cover`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}

export async function addCmsProjectGalleryImage(
  id: string,
  file: File,
  caption?: string
): Promise<void> {
  const formData = new FormData()
  formData.append("image", file)
  if (caption) formData.append("caption", caption)
  await http.post(`/projects/admin/${id}/gallery`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}

// ── Metrics ──────────────────────────────────────────────────────────────

export async function getCmsMetrics(): Promise<ApiSuccessResponse<ICmsMetrics>> {
  const [totalRes, completedRes, ongoingRes, faqsRes, testimonialsRes, contactRes] = await Promise.all([
    http.get<PaginatedResponse<RawProject>>("/projects/admin", { params: { limit: 1 } }),
    http.get<PaginatedResponse<RawProject>>("/projects/admin", { params: { limit: 1, status: "completed" } }),
    http.get<PaginatedResponse<RawProject>>("/projects/admin", { params: { limit: 1, status: "ongoing" } }),
    getFaqs(),
    getTestimonials(),
    getContactInfo(),
  ])

  const contactFieldsFilled = Object.values(contactRes.data).filter(value => Boolean(value)).length

  return {
    message: "ok",
    data: {
      total_projects: totalRes.data.pagination.total,
      completed_projects: completedRes.data.pagination.total,
      ongoing_projects: ongoingRes.data.pagination.total,
      faqs: faqsRes.data.items.length,
      testimonials: testimonialsRes.data.items.length,
      contact_info: contactFieldsFilled,
    },
  }
}

// ── Generic content-section helpers ─────────────────────────────────────
// FAQs, testimonials, and contact info all live as freeform JSON inside the
// backend's generic `content` module (one document per section, keyed by a
// `ContentSection` enum value) rather than as their own collections.

type RawContentSection<T> = {
  _id?: string
  section: string
  data: T
  isActive?: boolean
}

async function getContentSectionData<T>(section: string, fallback: T): Promise<T> {
  try {
    const res = await http.get<ApiSuccessResponse<RawContentSection<T>>>(`/content/${section}`)
    return { ...fallback, ...res.data.data.data }
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 404) return fallback
    throw err
  }
}

async function putContentSectionData<T>(section: string, data: T): Promise<T> {
  const res = await http.put<ApiSuccessResponse<RawContentSection<T>>>("/content", { section, data })
  return res.data.data.data
}

// ── Contact info ─────────────────────────────────────────────────────────

const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone_number: "",
  whatsapp_number: "",
  support_email: "",
  company_email: "",
  address: "",
}

export async function getContactInfo(): Promise<ApiSuccessResponse<ContactInfo>> {
  const data = await getContentSectionData("contact_info", DEFAULT_CONTACT_INFO)
  return { message: "ok", data }
}

export async function updateContactInfo(
  payload: ContactInfo
): Promise<ApiSuccessResponse<ContactInfo>> {
  const data = await putContentSectionData("contact_info", payload)
  return { message: "ok", data }
}

// ── Testimonials ─────────────────────────────────────────────────────────

type TestimonialsData = { items: ICmsTestimonial[] }
const EMPTY_TESTIMONIALS: TestimonialsData = { items: [] }

export async function getTestimonials(): Promise<ApiSuccessResponse<TestimonialsData>> {
  const data = await getContentSectionData("testimonials", EMPTY_TESTIMONIALS)
  return { message: "ok", data: { items: data.items ?? [] } }
}

export async function updateTestimonialStatus(payload: {
  id: string
  status: TestimonialStatus
}): Promise<ApiSuccessResponse<{ id: string }>> {
  const current = await getContentSectionData("testimonials", EMPTY_TESTIMONIALS)
  const items = (current.items ?? []).map(t =>
    t.id === payload.id ? { ...t, status: payload.status } : t
  )
  await putContentSectionData("testimonials", { items })
  return { message: "ok", data: { id: payload.id } }
}

export async function submitTestimonial(payload: {
  full_name: string
  occupation: string
  project_id: string
  testimony: string
}): Promise<ApiSuccessResponse<{ id: string }>> {
  const [current, projectsRes] = await Promise.all([
    getContentSectionData("testimonials", EMPTY_TESTIMONIALS),
    getCmsProjects(),
  ])
  const project = projectsRes.data.items.find(p => p.id === payload.project_id)

  const testimonial: ICmsTestimonial = {
    id: `t${Date.now()}`,
    project_id: payload.project_id,
    project_name: project?.name ?? "",
    full_name: payload.full_name,
    occupation: payload.occupation,
    testimony: payload.testimony,
    status: "new",
  }

  await putContentSectionData("testimonials", { items: [testimonial, ...(current.items ?? [])] })
  return { message: "ok", data: { id: testimonial.id } }
}

// ── FAQs ─────────────────────────────────────────────────────────────────

type FaqsData = { items: ICmsFaq[] }
const EMPTY_FAQS: FaqsData = { items: [] }

export async function getFaqs(): Promise<ApiSuccessResponse<FaqsData>> {
  const data = await getContentSectionData("faqs", EMPTY_FAQS)
  return { message: "ok", data: { items: data.items ?? [] } }
}

export async function createFaq(payload: {
  question: string
  answer: string
  project_id?: string
}): Promise<ApiSuccessResponse<ICmsFaq>> {
  const current = await getContentSectionData("faqs", EMPTY_FAQS)
  const faq: ICmsFaq = { id: `f${Date.now()}`, category: "General", ...payload }
  await putContentSectionData("faqs", { items: [faq, ...(current.items ?? [])] })
  return { message: "ok", data: faq }
}
