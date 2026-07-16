"use client"

import ReactECharts from "echarts-for-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IPropertyGrowthPoint } from "@/types/property.types"

export function PropertyGrowthChart({
  growth,
  overallRevenueLabel,
}: {
  growth: IPropertyGrowthPoint[]
  overallRevenueLabel: string
}) {
  const option = {
    grid: { left: 8, right: 8, top: 24, bottom: 24, containLabel: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: growth.map(g => g.month),
      axisLine: { lineStyle: { color: "#e2e8f0" } },
      axisTick: { show: false },
      axisLabel: { color: "#64748b", fontSize: 12 },
    },
    yAxis: { show: false },
    series: [
      {
        name: "Revenue",
        type: "line",
        smooth: true,
        symbol: "none",
        data: growth.map(g => g.revenue),
        lineStyle: { color: "#4bafeb", width: 2 },
        areaStyle: { color: "rgba(75,175,235,0.08)" },
      },
      {
        name: "Projected",
        type: "line",
        smooth: true,
        symbol: "none",
        data: growth.map(g => g.projected),
        lineStyle: { color: "#dc6f6f", width: 2 },
      },
    ],
  }

  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Projected growth
        </h3>

        <Select defaultValue="monthly">
          <SelectTrigger className="w-[143px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-2">
        <p className="text-3xl font-semibold text-foreground">
          {overallRevenueLabel}
        </p>
        <p className="text-sm text-muted-foreground">Overall Revenue</p>
      </div>

      <ReactECharts option={option} style={{ height: 280 }} />
    </div>
  )
}
