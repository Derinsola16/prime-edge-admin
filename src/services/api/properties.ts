import { http } from "@/utils/axios"
import { ApiSuccessResponse, PaginatedResponse } from "@/types/api.types"
import {
  IProperty,
  IPropertyDetail,
  IPropertyImage,
  IPropertyMetrics,
  IPropertyPaymentPlan,
  IPropertyProjectRef,
  GetPropertiesPayload,
  ProductStatus,
  ProductType,
} from "@/types/property.types"

// Cloudinary URLs uploaded before the backend was fixed to return `secure_url`
// are stored as `http://`, which `next/image`'s remote-pattern allowlist (https-only)
// rejects outright. Normalize defensively so old records don't crash the page.
function toSecureUrl(url: string): string {
  return url.replace(/^http:\/\//, "https://")
}

type RawProjectRef = {
  _id: string
  title: string
  slug?: string
  status?: string
  location?: IPropertyProjectRef["location"]
}

type RawProduct = {
  _id: string
  title: string
  slug: string
  project: RawProjectRef | string | null
  type: ProductType
  status: ProductStatus
  description?: string
  price: number
  priceLabel?: string
  size?: number
  bedrooms?: number
  bathrooms?: number
  toilets?: number
  parkingSpaces?: number
  floor?: number
  totalFloors?: number
  features: string[]
  images: (IPropertyImage & { _id?: string })[]
  floorPlan?: { url: string; publicId: string }
  virtualTourUrl?: string
  isFeatured: boolean
  isPublished: boolean
  serviceCharge?: number
  paymentPlans: IPropertyPaymentPlan[]
  createdAt: string
  updatedAt: string
}

function mapProjectRef(project: RawProduct["project"]): IPropertyProjectRef | null {
  if (!project || typeof project === "string") return null
  return {
    id: project._id,
    title: project.title,
    slug: project.slug,
    status: project.status,
    location: project.location,
  }
}

function formatLocation(project: IPropertyProjectRef | null): string {
  if (!project) return "No project assigned"
  const loc = project.location
  if (!loc) return project.title
  return `${project.title} • ${loc.city}, ${loc.state}`
}

function mapProperty(raw: RawProduct): IProperty {
  const project = mapProjectRef(raw.project)

  return {
    id: raw._id,
    name: raw.title,
    slug: raw.slug,
    thumbnail_url: toSecureUrl(raw.images?.[0]?.url ?? ""),
    location: formatLocation(project),
    type: raw.type,
    bedrooms: raw.bedrooms,
    price: raw.price,
    priceLabel: raw.priceLabel,
    status: raw.status,
    isPublished: raw.isPublished,
    isFeatured: raw.isFeatured,
    project,
    createdAt: raw.createdAt,
  }
}

function mapPropertyDetail(raw: RawProduct): IPropertyDetail {
  const project = mapProjectRef(raw.project)

  return {
    id: raw._id,
    name: raw.title,
    slug: raw.slug,
    description: raw.description,
    project,
    address: project?.location
      ? `${project.location.address}, ${project.location.city}, ${project.location.state}`
      : "Address unavailable",
    images: (raw.images ?? []).map(img => ({
      id: img._id,
      url: toSecureUrl(img.url),
      publicId: img.publicId,
      caption: img.caption,
    })),
    type: raw.type,
    status: raw.status,
    size: raw.size,
    bedrooms: raw.bedrooms,
    bathrooms: raw.bathrooms,
    toilets: raw.toilets,
    parkingSpaces: raw.parkingSpaces,
    floor: raw.floor,
    totalFloors: raw.totalFloors,
    price: raw.price,
    priceLabel: raw.priceLabel,
    serviceCharge: raw.serviceCharge,
    paymentPlans: raw.paymentPlans ?? [],
    features: raw.features ?? [],
    floorPlan: raw.floorPlan ? { ...raw.floorPlan, url: toSecureUrl(raw.floorPlan.url) } : raw.floorPlan,
    virtualTourUrl: raw.virtualTourUrl,
    isFeatured: raw.isFeatured,
    isPublished: raw.isPublished,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  }
}

function filterToParams(filter: GetPropertiesPayload["filter"]) {
  switch (filter) {
    case "available":
    case "reserved":
    case "sold":
    case "off_plan":
      return { status: filter }
    case "drafts":
      return { isPublished: false }
    case "featured":
      return { isFeatured: true }
    default:
      return {}
  }
}

export async function getProperties(
  payload: GetPropertiesPayload
): Promise<{ items: IProperty[]; total: number; page: number; pages: number; limit: number }> {
  const res = await http.get<PaginatedResponse<RawProduct>>("/products/admin", {
    params: {
      page: payload.page ?? 1,
      limit: payload.limit ?? 10,
      search: payload.search || undefined,
      ...filterToParams(payload.filter),
    },
  })

  return {
    items: res.data.data.map(mapProperty),
    total: res.data.pagination.total,
    page: res.data.pagination.page,
    pages: res.data.pagination.pages,
    limit: res.data.pagination.limit,
  }
}

export async function getPropertyMetrics(): Promise<IPropertyMetrics> {
  const [total, publishedRes, available, drafts] = await Promise.all([
    getProperties({ limit: 1 }),
    http.get<PaginatedResponse<RawProduct>>("/products/admin", { params: { limit: 1, isPublished: true } }),
    getProperties({ limit: 1, filter: "available" }),
    getProperties({ limit: 1, filter: "drafts" }),
  ])

  return {
    total_properties: total.total,
    published: publishedRes.data.pagination.total,
    available: available.total,
    drafts: drafts.total,
  }
}

export async function getPropertyById(id: string): Promise<ApiSuccessResponse<IPropertyDetail>> {
  const res = await http.get<ApiSuccessResponse<RawProduct>>(`/products/admin/${id}`)
  return { message: res.data.message, data: mapPropertyDetail(res.data.data) }
}

export type CreatePropertyPayload = {
  title: string
  type: ProductType
  description?: string
  price: number
  priceLabel?: string
  size?: number
  bedrooms?: number
  bathrooms?: number
  toilets?: number
  parkingSpaces?: number
  floor?: number
  totalFloors?: number
  serviceCharge?: number
  paymentPlans: IPropertyPaymentPlan[]
  features: string[]
  virtualTourUrl?: string
  isFeatured: boolean
  isPublished: boolean
  status: ProductStatus
}

export async function createProperty(
  projectId: string,
  payload: CreatePropertyPayload
): Promise<ApiSuccessResponse<IPropertyDetail>> {
  const res = await http.post<ApiSuccessResponse<RawProduct>>(
    `/products/admin/by-project/${projectId}`,
    payload
  )
  return { message: res.data.message, data: mapPropertyDetail(res.data.data) }
}

export async function updateProperty(
  id: string,
  payload: Partial<CreatePropertyPayload>
): Promise<ApiSuccessResponse<IPropertyDetail>> {
  const res = await http.put<ApiSuccessResponse<RawProduct>>(`/products/admin/${id}`, payload)
  return { message: res.data.message, data: mapPropertyDetail(res.data.data) }
}

export async function deleteProperty(id: string): Promise<ApiSuccessResponse<{ id: string }>> {
  const res = await http.delete<ApiSuccessResponse<unknown>>(`/products/admin/${id}`)
  return { message: res.data.message, data: { id } }
}

export async function togglePropertyPublish(
  id: string
): Promise<ApiSuccessResponse<{ isPublished: boolean }>> {
  const res = await http.patch<ApiSuccessResponse<{ isPublished: boolean }>>(
    `/products/admin/${id}/toggle-publish`
  )
  return res.data
}

export async function togglePropertyFeatured(
  id: string
): Promise<ApiSuccessResponse<{ isFeatured: boolean }>> {
  const res = await http.patch<ApiSuccessResponse<{ isFeatured: boolean }>>(
    `/products/admin/${id}/toggle-featured`
  )
  return res.data
}

export async function addPropertyImage(
  id: string,
  file: File,
  caption?: string
): Promise<ApiSuccessResponse<{ url: string; publicId: string }>> {
  const formData = new FormData()
  formData.append("image", file)
  if (caption) formData.append("caption", caption)

  const res = await http.post<ApiSuccessResponse<{ url: string; publicId: string }>>(
    `/products/admin/${id}/images`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  )
  return res.data
}

export async function removePropertyImage(
  id: string,
  publicId: string
): Promise<ApiSuccessResponse<unknown>> {
  const res = await http.delete(`/products/admin/${id}/images/${encodeURIComponent(publicId)}`)
  return res.data
}

export async function uploadPropertyFloorPlan(
  id: string,
  file: File
): Promise<ApiSuccessResponse<{ floorPlan: string }>> {
  const formData = new FormData()
  formData.append("image", file)

  const res = await http.put<ApiSuccessResponse<{ floorPlan: string }>>(
    `/products/admin/${id}/floor-plan`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  )
  return res.data
}

// ── Projects (for the property → project picker) ───────────────────────────

export type IProjectOption = {
  id: string
  title: string
  status: string
  location: { address: string; city: string; state: string; country: string }
}

type RawProject = {
  _id: string
  title: string
  status: string
  location: IProjectOption["location"]
}

export async function getProjectOptions(search?: string): Promise<IProjectOption[]> {
  const res = await http.get<PaginatedResponse<RawProject>>("/projects/admin", {
    params: { limit: 100, search: search || undefined },
  })

  return res.data.data.map(p => ({
    id: p._id,
    title: p.title,
    status: p.status,
    location: p.location,
  }))
}
