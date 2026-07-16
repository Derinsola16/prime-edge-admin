export type IDashboardMetrics = {
  total_capital_deployed: number
  total_capital_growth: string
  total_investors: number
  new_investors_badge: string
  investors_note: string
  pending_tasks: number
  pending_tasks_note: string
  active_projects: number
  active_projects_badge: string
  active_projects_note: string
}

export type IPendingTask = {
  id: string
  title: string
  subtitle: string
  property: string
  location: string
  action_label: string
  icon: "kyc" | "title-deed"
}
