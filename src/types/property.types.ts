export type ProductType =
  | "apartment"
  | "duplex"
  | "terrace"
  | "penthouse"
  | "studio"
  | "office"
  | "shop"
  | "warehouse"
  | "land"
  | "bungalow"
  | "mansion"

export type ProductStatus = "available" | "reserved" | "sold" | "off_plan"

export const PRODUCT_TYPE_OPTIONS: { value: ProductType; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "duplex", label: "Duplex" },
  { value: "terrace", label: "Terrace" },
  { value: "penthouse", label: "Penthouse" },
  { value: "studio", label: "Studio" },
  { value: "office", label: "Office" },
  { value: "shop", label: "Shop" },
  { value: "warehouse", label: "Warehouse" },
  { value: "land", label: "Land" },
  { value: "bungalow", label: "Bungalow" },
  { value: "mansion", label: "Mansion" },
]

export const PRODUCT_STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
  { value: "off_plan", label: "Off-Plan" },
]

export type IPropertyImage = {
  id?: string
  url: string
  publicId: string
  caption?: string
}

export type IPropertyPaymentPlan = {
  name: string
  description?: string
  duration?: string
}

export type IPropertyProjectRef = {
  id: string
  title: string
  slug?: string
  status?: string
  location?: {
    address: string
    city: string
    state: string
    country: string
  }
}

/** Row shape used on the property list/table. */
export type IProperty = {
  id: string
  name: string
  slug: string
  thumbnail_url: string
  location: string
  type: ProductType
  bedrooms?: number
  price: number
  priceLabel?: string
  status: ProductStatus
  isPublished: boolean
  isFeatured: boolean
  project: IPropertyProjectRef | null
  createdAt: string
}

export type IPropertyMetrics = {
  total_properties: number
  published: number
  available: number
  drafts: number
}

export type GetPropertiesPayload = {
  page?: number
  limit?: number
  search?: string
  filter?: "all" | "available" | "reserved" | "sold" | "off_plan" | "drafts" | "featured"
}

/** Full detail shape used on the property preview/details page. */
export type IPropertyDetail = {
  id: string
  name: string
  slug: string
  description?: string
  project: IPropertyProjectRef | null
  address: string
  images: IPropertyImage[]
  type: ProductType
  status: ProductStatus
  size?: number
  bedrooms?: number
  bathrooms?: number
  toilets?: number
  parkingSpaces?: number
  floor?: number
  totalFloors?: number
  price: number
  priceLabel?: string
  serviceCharge?: number
  paymentPlans: IPropertyPaymentPlan[]
  features: string[]
  floorPlan?: { url: string; publicId: string }
  virtualTourUrl?: string
  isFeatured: boolean
  isPublished: boolean
  createdAt: string
  updatedAt: string
}
