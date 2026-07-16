"use client"

import ReactECharts from "echarts-for-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IRevenuePoint } from "@/types/finance.types"

export function RevenueChart({
  data,
  overallRevenueLabel,
}: {
  data: IRevenuePoint[]
  overallRevenueLabel: string
}) {
  const option = {
    grid: { left: 8, right: 8, top: 24, bottom: 24, containLabel: true },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: data.map(d => d.month),
      axisLine: { lineStyle: { color: "#e2e8f0" } },
      axisTick: { show: false },
      axisLabel: { color: "#64748b", fontSize: 12 },
    },
    yAxis: { show: false },
    series: [
      {
        name: "Inflow",
        type: "line",
        smooth: true,
        symbol: "none",
        data: data.map(d => d.inflow),
        lineStyle: { color: "#dc6f6f", width: 2 },
      },
      {
        name: "Outflow",
        type: "line",
        smooth: true,
        symbol: "none",
        data: data.map(d => d.outflow),
        lineStyle: { color: "#19d163", width: 2 },
      },
    ],
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Revenue Distribution</h3>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Inflow vs. Outflow (Last 12 months)</p>
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
        <p className="text-3xl font-semibold text-foreground">{overallRevenueLabel}</p>
        <p className="text-sm text-muted-foreground">Overal Revenue</p>
      </div>

      <ReactECharts option={option} style={{ height: 280 }} />
    </div>
  )
}
