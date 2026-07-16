import { ApiSuccessResponse, ICursorPagination } from "@/types/api.types"
import {
  IProperty,
  IPropertyDetail,
  IPropertyMetrics,
  GetPropertiesPayload,
} from "@/types/property.types"

// TODO: replace with real API calls once the backend endpoint is ready.
// import { http } from "@/utils/axios"

const MOCK_METRICS: IPropertyMetrics = {
  total_properties: 25,
  completed_projects: 13,
  ongoing_projects: 10,
  delivered_homes: 2,
}

const MOCK_PROPERTIES: IProperty[] = [
  {
    id: "p1",
    name: "4 Bedroom Terrace + BQ",
    thumbnail_url: "/assets/images/properties/property-1.png",
    location: "The Haven • Victoria Island, Lagos Nigeria",
    units: 4,
    status: "construction",
    construction_progress: 65,
    truscrow_verified: true,
  },
  {
    id: "p2",
    name: "4 Bedroom Penthouse + BQs",
    thumbnail_url: "/assets/images/properties/property-2.png",
    location: "Ivie Tower • Victoria Island, Lagos Nigeria",
    units: 10,
    status: "operational",
    truscrow_verified: true,
  },
  {
    id: "p3",
    name: "2-Bedroom Apartments",
    thumbnail_url: "/assets/images/properties/property-2.png",
    location: "The Haven • Victoria Island, Lagos Nigeria",
    units: 3,
    status: "construction",
    construction_progress: 15,
    truscrow_verified: true,
  },
  {
    id: "p4",
    name: "3-Bedroom Terrace",
    thumbnail_url: "/assets/images/properties/property-1.png",
    location: "The Alfred • Victoria Island, Lagos Nigeria",
    units: 2,
    status: "completed",
    truscrow_verified: true,
  },
  {
    id: "p5",
    name: "4-Bedroom Terrace",
    thumbnail_url: "/assets/images/properties/property-1.png",
    location: "Bakers Court • Victoria Island, Lagos Nigeria",
    units: 5,
    status: "completed",
    truscrow_verified: true,
  },
]

const MOCK_PROPERTY_DETAIL: IPropertyDetail = {
  id: "p1",
  name: "4 Bedroom Terrace + BQs",
  estate_name: "The Haven",
  address: "Waziri Ibrahim Crescent, Victoria Island, Lagos Nigeria",
  images: [
    "/assets/images/properties/property-1.png",
    "/assets/images/properties/property-2.png",
    "/assets/images/properties/property-1.png",
    "/assets/images/properties/property-2.png",
  ],
  location_label: "Victoria Island",
  location_note: "Waziri Ibrahim Crescent, Victoria Island",
  duration_label: "24 months",
  duration_note: "From statutory building approval.",
  bedrooms: 2,
  has_bq: true,
  projected_irr: 18.5,
  property_type: "Residential Luxury",
  developer: "Prime Edge",
  tenure: "Freehold",
  completion_label: "Q4 2024",
  description:
    "The Haven Residence is an exclusive residential enclave set on Waziri Ibrahim Crescent, Victoria Island—one of the city's most established and secure neighbourhoods. Occupying a 3,600 sqm site, the development is intentionally limited to just 20 residences, allowing space, privacy, and calm to define everyday living. Designed as a retreat within the city, The Haven balances architectural clarity with functional elegance, offering homes that feel composed, spacious, and enduring. This is not a high-density development. It is a considered place to live—and to hold.",
  target_irr: 12.5,
  exp_cash_yield: 4.2,
  min_investment: 25_000_000,
  funding_raised: 4_200_000,
  funding_target: 25_000_000,
  funding_percent: 84,
  days_left: 5,
  units_available: 18,
  units_bought: 14,
  risk_rating: "A",
  documents: [
    {
      id: "d1",
      label: "Investment Memorandum",
      format: "PDF",
      size_label: "2.4 MB",
      url: "#",
    },
    {
      id: "d2",
      label: "Legal Title Report",
      format: "PDF",
      size_label: "5.1 MB",
      url: "#",
    },
    {
      id: "d3",
      label: "Technical Survey",
      format: "PDF",
      size_label: "2.4 MB",
      url: "#",
    },
    {
      id: "d4",
      label: "Financial Model",
      format: "PDF",
      size_label: "5.1 MB",
      url: "#",
    },
  ],
  floor_plan_url: "/assets/images/properties/property-1.png",
  amenities: [
    { id: "a1", label: "Landscaped courtyards and green walkways", icon: "trees" },
    { id: "a2", label: "A residents-only swimming pool and lounge", icon: "waves" },
    { id: "a3", label: "A fully equipped wellness and fitness centre", icon: "heart-pulse" },
    { id: "a4", label: "Smart access control and CCTV surveillance", icon: "qr-code" },
    { id: "a5", label: "Dedicated power supply and water treatment systems", icon: "zap" },
    { id: "a6", label: "Concierge-style service areas", icon: "concierge-bell" },
    { id: "a7", label: "24-hour security and professional facility management", icon: "shield-check" },
    { id: "a8", label: "Ample private parking", icon: "square-parking" },
  ],
  growth: [
    { month: "Sep", revenue: 18000, projected: 17000 },
    { month: "Oct", revenue: 22000, projected: 19000 },
    { month: "Nov", revenue: 19500, projected: 21000 },
    { month: "Dec", revenue: 24000, projected: 22500 },
    { month: "Jan", revenue: 27000, projected: 24000 },
    { month: "Feb", revenue: 25500, projected: 26000 },
    { month: "Mar", revenue: 29000, projected: 27500 },
    { month: "Apr", revenue: 31000, projected: 29000 },
    { month: "May", revenue: 28500, projected: 30500 },
    { month: "Jun", revenue: 33000, projected: 32000 },
    { month: "Jul", revenue: 35800, projected: 33500 },
    { month: "Aug", revenue: 34000, projected: 35000 },
  ],
  overall_revenue_label: "$35.8K",
  current_valuation: 25_000_000,
  share_price: 1_000_000,
  hold_period: "Forever",
  min_investment_amount: 5_000_000,
}

export async function getPropertyMetrics(): Promise<
  ApiSuccessResponse<IPropertyMetrics>
> {
  // const res = await http.get("/api/properties/metrics")
  // return res.data

  await new Promise(resolve => setTimeout(resolve, 300))

  return { message: "ok", data: MOCK_METRICS }
}

export async function getProperties(
  payload: GetPropertiesPayload
): Promise<
  ApiSuccessResponse<{ items: IProperty[]; pagination: ICursorPagination }>
> {
  // const res = await http.get("/api/properties", { params: payload })
  // return res.data

  void payload

  await new Promise(resolve => setTimeout(resolve, 300))

  return {
    message: "ok",
    data: {
      items: MOCK_PROPERTIES,
      pagination: {
        per_page: 10,
        has_next_page: true,
        has_prev_page: false,
        prev_page_cursor: "",
        next_page_cursor: "2",
      },
    },
  }
}

export async function getPropertyById(
  id: string
): Promise<ApiSuccessResponse<IPropertyDetail>> {
  // const res = await http.get(`/api/properties/${id}`)
  // return res.data

  void id

  await new Promise(resolve => setTimeout(resolve, 300))

  return { message: "ok", data: MOCK_PROPERTY_DETAIL }
}

export async function createProperty(
  payload: Record<string, unknown>
): Promise<ApiSuccessResponse<{ id: string }>> {
  // const res = await http.post("/api/properties", payload)
  // return res.data

  void payload

  await new Promise(resolve => setTimeout(resolve, 500))

  return { message: "ok", data: { id: `p${Date.now()}` } }
}
