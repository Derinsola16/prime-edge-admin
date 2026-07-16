import { Building2 } from "lucide-react"

import { IPropertyDetail } from "@/types/property.types"
import { SectionCard } from "@/components/properties/section-card"

export function PropertyOverview({ property }: { property: IPropertyDetail }) {
  const facts = [
    { label: "Property Type", value: property.property_type },
    { label: "Developer", value: property.developer },
    { label: "Tenure", value: property.tenure },
    { label: "Completion", value: property.completion_label },
  ]

  return (
    <SectionCard icon={Building2} title="Overview">
      <div className="mb-6 grid grid-cols-4 gap-4">
        {facts.map(fact => (
          <div key={fact.label}>
            <p className="text-sm text-muted-foreground">{fact.label}</p>
            <p className="mt-1 font-medium text-foreground">{fact.value}</p>
          </div>
        ))}
      </div>

      <p className="border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
        {property.description}
      </p>
    </SectionCard>
  )
}
