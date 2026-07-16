export type IAnalyticsMetrics = {
  total_properties_worth: number
  total_properties_growth: string
  active_clients: number
  inactive_clients: number
  total_signups: number
  avg_time_spent: string
  website_visitors: number
  on_time_payment_ratio: string
  inflow: number
  inflow_growth: string
}

export type IVelocityPoint = { month: string; target: number; inflow: number }

export type ILocationShare = { label: string; percent: number }

export type IFunnelStep = {
  label: string
  note: string
  value: number
  percent: number
  color: string
}

export type IFundedProject = {
  id: string
  name: string
  location: string
  units: number
  image_url: string
  funded_percent: number
  badge: string
  badge_tone: "destructive" | "warning" | "info"
}

export type IKycActivitySlice = { label: string; value: number; percent: number; color: string }

export type IPlatformVisit = {
  total_visitors: number
  growth: string
  center_value: number
  platforms: { label: string; color: string }[]
}
