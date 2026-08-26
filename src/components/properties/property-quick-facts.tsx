import { MapPin, BedDouble, Bath, Ruler } from "lucide-react"

import { IPropertyDetail } from "@/types/property.types"

export function PropertyQuickFacts({ property }: { property: IPropertyDetail }) {
  const facts = [
    {
      icon: MapPin,
      label: "Project",
      value: property.project?.title ?? "Unassigned",
      note: property.project?.location
        ? `${property.project.location.city}, ${property.project.location.state}`
        : undefined,
    },
    {
      icon: BedDouble,
      label: "Bedrooms",
      value: property.bedrooms !== undefined ? String(property.bedrooms) : "—",
      note: property.toilets !== undefined ? `${property.toilets} toilets` : undefined,
    },
    {
      icon: Bath,
      label: "Bathrooms",
      value: property.bathrooms !== undefined ? String(property.bathrooms) : "—",
      note: property.parkingSpaces !== undefined ? `${property.parkingSpaces} parking` : undefined,
    },
    {
      icon: Ruler,
      label: "Size",
      value: property.size !== undefined ? `${property.size} sqm` : "—",
      note:
        property.floor !== undefined
          ? `Floor ${property.floor}${property.totalFloors ? ` of ${property.totalFloors}` : ""}`
          : undefined,
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
