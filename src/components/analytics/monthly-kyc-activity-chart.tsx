"use client"

import ReactECharts from "echarts-for-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IKycActivitySlice } from "@/types/analytics.types"

export function MonthlyKycActivityChart({
  data,
  averageRange,
}: {
  data: IKycActivitySlice[]
  averageRange: number
}) {
  const option = {
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
        radius: ["65%", "90%"],
        label: { show: false },
        data: data.map(d => ({
          name: d.label,
          value: d.percent,
          itemStyle: { color: d.color },
        })),
      },
    ],
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Monthly KYC Activity</h3>
          <p className="text-sm text-muted-foreground">Platform Statistics</p>
        </div>
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

      <p className="mb-2 text-center text-sm font-medium text-foreground">Monthly activity</p>

      <div className="relative">
        <ReactECharts option={option} style={{ height: 260 }} />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold text-foreground">{averageRange}</span>
          <span className="text-xs text-muted-foreground">Average range</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
        {data.map(slice => (
          <div key={slice.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="size-2 rounded-full" style={{ backgroundColor: slice.color }} />
              {slice.label}
            </span>
            <span className="font-medium text-foreground">{slice.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
