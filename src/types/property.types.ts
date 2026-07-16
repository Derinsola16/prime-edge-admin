export type PropertyStatus =
  | "construction"
  | "operational"
  | "completed"
  | "delivered"
  | "draft"

export type IProperty = {
  id: string
  name: string
  thumbnail_url: string
  location: string
  units: number
  status: PropertyStatus
  construction_progress?: number
  truscrow_verified: boolean
}

export type IPropertyMetrics = {
  total_properties: number
  completed_projects: number
  ongoing_projects: number
  delivered_homes: number
}

export type GetPropertiesPayload = {
  page?: number
  filter?: "all" | "ongoing" | "completed" | "delivered" | "drafts"
}

export type IPropertyDocument = {
  id: string
  label: string
  format: string
  size_label: string
  url: string
}

export type IPropertyAmenity = {
  id: string
  label: string
  icon: string
}

export type IPropertyGrowthPoint = {
  month: string
  revenue: number
  projected: number
}

export type IPropertyDetail = {
  id: string
  name: string
  estate_name: string
  address: string
  images: string[]
  location_label: string
  location_note: string
  duration_label: string
  duration_note: string
  bedrooms: number
  has_bq: boolean
  projected_irr: number
  property_type: string
  developer: string
  tenure: string
  completion_label: string
  description: string
  target_irr: number
  exp_cash_yield: number
  min_investment: number
  funding_raised: number
  funding_target: number
  funding_percent: number
  days_left: number
  units_available: number
  units_bought: number
  risk_rating: string
  documents: IPropertyDocument[]
  floor_plan_url: string
  amenities: IPropertyAmenity[]
  growth: IPropertyGrowthPoint[]
  overall_revenue_label: string
  current_valuation: number
  share_price: number
  hold_period: string
  min_investment_amount: number
}
