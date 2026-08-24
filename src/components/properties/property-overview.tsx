import { Building2 } from "lucide-react"

import { IPropertyDetail } from "@/types/property.types"
import { SectionCard } from "@/components/properties/section-card"
import { formatPropertyType } from "@/helpers/functions/property"

export function PropertyOverview({ property }: { property: IPropertyDetail }) {
  const facts = [
    { label: "Property Type", value: formatPropertyType(property.type) },
    { label: "Project", value: property.project?.title ?? "—" },
    { label: "Total Floors", value: property.totalFloors ? String(property.totalFloors) : "—" },
    { label: "Listed", value: new Date(property.createdAt).toLocaleDateString() },
  ]

  return (
    <SectionCard icon={Building2} title="Overview">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {facts.map(fact => (
          <div key={fact.label}>
            <p className="text-sm text-muted-foreground">{fact.label}</p>
            <p className="mt-1 font-medium text-foreground">{fact.value}</p>
          </div>
        ))}
      </div>

      <p className="border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
        {property.description || "No description provided."}
      </p>
    </SectionCard>
  )
}
