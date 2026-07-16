import { ApiSuccessResponse } from "@/types/api.types"
import {
  IAnalyticsMetrics,
  IFundedProject,
  IFunnelStep,
  IKycActivitySlice,
  ILocationShare,
  IPlatformVisit,
  IVelocityPoint,
} from "@/types/analytics.types"

// TODO: replace with real API calls once the backend endpoint is ready.
// import { http } from "@/utils/axios"

const MOCK_METRICS: IAnalyticsMetrics = {
  total_properties_worth: 4_200_000_000,
  total_properties_growth: "+12.4% from last month",
  active_clients: 10_000,
  inactive_clients: 5_600_000_000,
  total_signups: 24_000,
  avg_time_spent: "10 mins",
  website_visitors: 10_000,
  on_time_payment_ratio: "33%",
  inflow: 10_200_000,
  inflow_growth: "+12.4% from last month",
}

const MOCK_VELOCITY: IVelocityPoint[] = [
  { month: "Sep", target: 21000, inflow: 18000 },
  { month: "Oct", target: 19000, inflow: 22000 },
  { month: "Nov", target: 24000, inflow: 19500 },
  { month: "Dec", target: 22500, inflow: 24000 },
  { month: "Jan", target: 20000, inflow: 27000 },
  { month: "Feb", target: 26000, inflow: 25500 },
  { month: "Mar", target: 27500, inflow: 29000 },
  { month: "Apr", target: 29000, inflow: 31000 },
  { month: "May", target: 30500, inflow: 28500 },
  { month: "Jun", target: 32000, inflow: 33000 },
  { month: "Jul", target: 33500, inflow: 35800 },
  { month: "Aug", target: 35000, inflow: 34000 },
]

const MOCK_LOCATIONS: ILocationShare[] = [
  { label: "USA", percent: 39.11 },
  { label: "Nigeria", percent: 28.02 },
  { label: "UK", percent: 23.13 },
  { label: "Ghana", percent: 5.03 },
]

const MOCK_FUNNEL: IFunnelStep[] = [
  { label: "Site Visitors", note: "100% Volume", value: 10_000, percent: 100, color: "#fa7319" },
  { label: "Account Sign ups", note: "16% Conversion", value: 24_000, percent: 40, color: "#010a58" },
  { label: "KYC Verified", note: "36% of sign ups", value: 24_000, percent: 55, color: "#7c3aed" },
  { label: "Property Portfolio", note: "75% of sold out of total Properties", value: 12, percent: 75, color: "#19d163" },
]

const MOCK_FUNDED_PROJECTS: IFundedProject[] = [
  {
    id: "fp1",
    name: "4 Bedroom Terrace + BQ",
    location: "The Haven • Victoria Island, Lagos Nigeria",
    units: 4,
    image_url: "/assets/images/properties/property-1.png",
    funded_percent: 100,
    badge: "Sold out",
    badge_tone: "destructive",
  },
  {
    id: "fp2",
    name: "4 Bedroom Terrace + BQ",
    location: "The Haven • Victoria Island, Lagos Nigeria",
    units: 4,
    image_url: "/assets/images/properties/property-2.png",
    funded_percent: 65,
    badge: "Trending",
    badge_tone: "info",
  },
  {
    id: "fp3",
    name: "4 Bedroom Terrace + BQ",
    location: "The Haven • Victoria Island, Lagos Nigeria",
    units: 4,
    image_url: "/assets/images/properties/property-1.png",
    funded_percent: 10,
    badge: "Newly Listed",
    badge_tone: "warning",
  },
  {
    id: "fp4",
    name: "4 Bedroom Terrace + BQ",
    location: "The Haven • Victoria Island, Lagos Nigeria",
    units: 4,
    image_url: "/assets/images/properties/property-2.png",
    funded_percent: 10,
    badge: "Newly Listed",
    badge_tone: "warning",
  },
]

const MOCK_KYC_ACTIVITY: IKycActivitySlice[] = [
  { label: "Approved", value: 569, percent: 39, color: "#010a58" },
  { label: "Pending", value: 470, percent: 26, color: "#ffdca8" },
  { label: "Under review", value: 35, percent: 24, color: "#f9a8d4" },
  { label: "Rejected", value: 2, percent: 11, color: "#fa7319" },
]

const MOCK_PLATFORM_VISIT: IPlatformVisit = {
  total_visitors: 12_563,
  growth: "1.3%",
  center_value: 3_450,
  platforms: [
    { label: "Mac", color: "#ddd6fe" },
    { label: "Windows", color: "#7c3aed" },
    { label: "Android", color: "#c4b5fd" },
    { label: "iOS", color: "#ede9fe" },
  ],
}

export async function getAnalyticsMetrics(): Promise<ApiSuccessResponse<IAnalyticsMetrics>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: MOCK_METRICS }
}

export async function getInvestmentVelocity(): Promise<
  ApiSuccessResponse<{ items: IVelocityPoint[] }>
> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_VELOCITY } }
}

export async function getClientLocations(): Promise<
  ApiSuccessResponse<{ items: ILocationShare[] }>
> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_LOCATIONS } }
}

export async function getFunnelEfficiency(): Promise<
  ApiSuccessResponse<{ items: IFunnelStep[] }>
> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_FUNNEL } }
}

export async function getMostFundedProjects(): Promise<
  ApiSuccessResponse<{ items: IFundedProject[] }>
> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_FUNDED_PROJECTS } }
}

export async function getMonthlyKycActivity(): Promise<
  ApiSuccessResponse<{ items: IKycActivitySlice[]; average_range: number }>
> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_KYC_ACTIVITY, average_range: 1.05 } }
}

export async function getPlatformVisit(): Promise<ApiSuccessResponse<IPlatformVisit>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: MOCK_PLATFORM_VISIT }
}
