"use client"

import ReactECharts from "echarts-for-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IVelocityPoint } from "@/types/analytics.types"

export function InvestmentVelocityChart({ data }: { data: IVelocityPoint[] }) {
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
        name: "Target",
        type: "line",
        smooth: true,
        symbol: "none",
        data: data.map(d => d.target),
        lineStyle: { color: "#dc6f6f", width: 2 },
      },
      {
        name: "Inflow",
        type: "line",
        smooth: true,
        symbol: "none",
        data: data.map(d => d.inflow),
        lineStyle: { color: "#19d163", width: 2 },
      },
    ],
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Investment Velocity</h3>
          <p className="text-sm text-muted-foreground">Capital Inflow vs. Target</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-[#dc6f6f]" />
            Target
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-[#19d163]" />
            Inflow
          </span>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ReactECharts option={option} style={{ height: 280 }} />
    </div>
  )
}
