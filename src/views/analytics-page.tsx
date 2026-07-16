"use client"

import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { FunnelEfficiency } from "@/components/analytics/funnel-efficiency"
import { AnalyticsMetrics } from "@/components/analytics/analytics-metrics"
import { PlatformVisitChart } from "@/components/analytics/platform-visit-chart"
import { MostFundedProjects } from "@/components/analytics/most-funded-projects"
import { ClientLocationsChart } from "@/components/analytics/client-locations-chart"
import { InvestmentVelocityChart } from "@/components/analytics/investment-velocity-chart"
import { MonthlyKycActivityChart } from "@/components/analytics/monthly-kyc-activity-chart"
import {
  getAnalyticsMetrics,
  getClientLocations,
  getFunnelEfficiency,
  getInvestmentVelocity,
  getMonthlyKycActivity,
  getMostFundedProjects,
  getPlatformVisit,
} from "@/services/api/analytics"

export default function AnalyticsPage() {
  const { data: metricsRes } = useQuery({
    queryKey: ["analytics-metrics"],
    queryFn: getAnalyticsMetrics,
  })
  const { data: velocityRes } = useQuery({
    queryKey: ["investment-velocity"],
    queryFn: getInvestmentVelocity,
  })
  const { data: locationsRes } = useQuery({
    queryKey: ["client-locations"],
    queryFn: getClientLocations,
  })
  const { data: funnelRes } = useQuery({
    queryKey: ["funnel-efficiency"],
    queryFn: getFunnelEfficiency,
  })
  const { data: projectsRes } = useQuery({
    queryKey: ["most-funded-projects"],
    queryFn: getMostFundedProjects,
  })
  const { data: kycRes } = useQuery({
    queryKey: ["monthly-kyc-activity"],
    queryFn: getMonthlyKycActivity,
  })
  const { data: visitRes } = useQuery({
    queryKey: ["platform-visit"],
    queryFn: getPlatformVisit,
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Platform Analytics
        </h1>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full">
            Export
          </Button>
          <Button className="rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover">
            Download Report
          </Button>
        </div>
      </div>

      {metricsRes && <AnalyticsMetrics metrics={metricsRes.data} />}

      <div className="grid grid-cols-[1fr_380px] gap-6">
        {velocityRes && <InvestmentVelocityChart data={velocityRes.data.items} />}
        {locationsRes && <ClientLocationsChart data={locationsRes.data.items} />}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {funnelRes && <FunnelEfficiency steps={funnelRes.data.items} />}
        {projectsRes && <MostFundedProjects projects={projectsRes.data.items} />}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {kycRes && (
          <MonthlyKycActivityChart
            data={kycRes.data.items}
            averageRange={kycRes.data.average_range}
          />
        )}
        {visitRes && <PlatformVisitChart data={visitRes.data} />}
      </div>
    </div>
  )
}
