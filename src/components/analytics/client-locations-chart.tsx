"use client"

import ReactECharts from "echarts-for-react"

import { ILocationShare } from "@/types/analytics.types"

const colors = ["#4c1d95", "#7c3aed", "#a78bfa", "#ddd6fe"]

export function ClientLocationsChart({ data }: { data: ILocationShare[] }) {
  const option = {
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
        radius: ["0%", "70%"],
        label: { show: false },
        data: data.map((d, i) => ({
          name: d.label,
          value: d.percent,
          itemStyle: { color: colors[i % colors.length] },
        })),
      },
    ],
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground">Client Locations</h3>
      <p className="mb-4 text-sm text-muted-foreground">Global Concentration</p>

      <ReactECharts option={option} style={{ height: 180 }} />

      <div className="mt-4 space-y-2">
        {data.map((location, i) => (
          <div key={location.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: colors[i % colors.length] }}
              />
              {location.label}
            </span>
            <span className="font-medium text-foreground">{location.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
