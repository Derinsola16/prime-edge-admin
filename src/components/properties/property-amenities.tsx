import {
  Trees,
  Waves,
  HeartPulse,
  QrCode,
  Zap,
  ConciergeBell,
  ShieldCheck,
  SquareParking,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

import { IPropertyAmenity } from "@/types/property.types"

const iconMap: Record<string, LucideIcon> = {
  trees: Trees,
  waves: Waves,
  "heart-pulse": HeartPulse,
  "qr-code": QrCode,
  zap: Zap,
  "concierge-bell": ConciergeBell,
  "shield-check": ShieldCheck,
  "square-parking": SquareParking,
}

export function PropertyAmenities({
  amenities,
}: {
  amenities: IPropertyAmenity[]
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <h3 className="mb-6 text-lg font-semibold text-foreground">Amenities</h3>

      <div className="grid grid-cols-4 gap-x-4 gap-y-8">
        {amenities.map(amenity => {
          const Icon = iconMap[amenity.icon] ?? Sparkles

          return (
            <div key={amenity.id} className="flex flex-col items-center text-center">
              <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
                <Icon className="size-6" />
              </span>
              <p className="text-sm text-muted-foreground">{amenity.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
