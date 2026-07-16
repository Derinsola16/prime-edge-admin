"use client"

import ReactECharts from "echarts-for-react"

import { IPlatformVisit } from "@/types/analytics.types"

export function PlatformVisitChart({ data }: { data: IPlatformVisit }) {
  const option = {
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
        radius: ["70%", "100%"],
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "85%"],
        label: { show: false },
        data: data.platforms.map(p => ({
          name: p.label,
          value: 1,
          itemStyle: { color: p.color },
        })),
      },
    ],
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground">Platform Visit</h3>

      <div className="mt-2 flex items-center justify-between">
        <div>
          <p className="text-2xl font-semibold text-foreground">
            {data.total_visitors.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Visitors</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">
          {data.growth} ↑
        </span>
      </div>

      <div className="mt-2 flex items-center gap-4">
        {data.platforms.map(p => (
          <span key={p.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-2 rounded-full" style={{ backgroundColor: p.color }} />
            {p.label}
          </span>
        ))}
      </div>

      <div className="relative mt-2">
        <ReactECharts option={option} style={{ height: 160 }} />
        <div className="pointer-events-none absolute inset-x-0 top-[60%] flex justify-center">
          <span className="rounded-full bg-brand-deepblue px-3 py-1.5 text-sm font-semibold text-white">
            {data.center_value.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
