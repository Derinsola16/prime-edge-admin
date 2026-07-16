export type KycStatus = "pending" | "approved" | "rejected"

export type IClient = {
  id: string
  name: string
  portfolio_value: number
  country: string
  kyc_status: KycStatus
  join_date: string
}

export type IClientMetrics = {
  total_clients: number
  total_clients_growth: string
  pending_kyc: number
  kyc_approved: number
  total_properties_funded: number
  total_signups: number
}

export type IClientDetailMetrics = {
  total_property: number
  delivered_homes: number
  property_in_funding: number
  kyc_submitted: number
  pending_documents: number
}

export type IClientDetail = {
  id: string
  name: string
  reference: string
  status: "new" | "existing"
  kyc_status: KycStatus
  email: string
  phone: string
  location: string
  date_joined: string
  metrics: IClientDetailMetrics
  funding_raised: number
  funding_target: number
  funding_percent: number
  number_of_projects: number
  months_left: number
}

export type ActivityStatus = "completed" | "pending" | "failed"

export type IClientActivity = {
  id: string
  title: string
  subtitle: string
  amount: number
  status: ActivityStatus
  execution_date: string
}

export type ITransactionDetail = {
  id: string
  amount: number
  payment_plan: string
  funding_raised: number
  funding_target: number
  funding_percent: number
  account_name: string
  paid_to: string
  payment_type: string
  property: string
  reference_number: string
  payment_option: string
  payment_status: string
  date: string
}
