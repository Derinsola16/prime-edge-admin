import { MapPin, Clock, BedDouble, TrendingUp } from "lucide-react"

import { IPropertyDetail } from "@/types/property.types"

export function PropertyQuickFacts({
  property,
}: {
  property: IPropertyDetail
}) {
  const facts = [
    {
      icon: MapPin,
      label: "Location",
      value: property.location_label,
      note: property.location_note,
    },
    {
      icon: Clock,
      label: "Duration",
      value: property.duration_label,
      note: property.duration_note,
    },
    {
      icon: BedDouble,
      label: "Bedrooms",
      value: String(property.bedrooms),
      note: property.has_bq ? "+BQ" : undefined,
    },
    {
      icon: TrendingUp,
      label: "Projected IRR",
      value: `${property.projected_irr}%`,
      note: "Yearly Growth",
      accent: true,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {facts.map(fact => (
        <div
          key={fact.label}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <fact.icon className="size-3.5" />
            {fact.label}
          </div>
          <p
            className={
              fact.accent
                ? "text-2xl font-semibold text-success"
                : "text-2xl font-semibold text-foreground"
            }
          >
            {fact.value}
          </p>
          {fact.note && (
            <p className="mt-1 text-sm text-muted-foreground">{fact.note}</p>
          )}
        </div>
      ))}
    </div>
  )
}
