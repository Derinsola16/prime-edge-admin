import { ChartColumnBig } from "lucide-react"

import { IPropertyDetail } from "@/types/property.types"
import { SectionCard } from "@/components/properties/section-card"
import { formatNaira } from "@/helpers/functions/property"

export function PropertyPricing({ property }: { property: IPropertyDetail }) {
  const stats = [
    { label: "Price", value: property.priceLabel || formatNaira(property.price) },
    { label: "Service Charge", value: formatNaira(property.serviceCharge) },
  ]

  return (
    <SectionCard icon={ChartColumnBig} title="Pricing & Payment Plans">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map(stat => (
          <div key={stat.label}>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {property.paymentPlans.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {property.paymentPlans.map((plan, i) => (
            <div key={i} className="rounded-lg border border-border p-4">
              <p className="text-sm font-medium text-foreground">{plan.name}</p>
              {plan.duration && (
                <p className="mt-0.5 text-xs text-muted-foreground">{plan.duration}</p>
              )}
              {plan.description && (
                <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
          No payment plans configured for this property.
        </p>
      )}
    </SectionCard>
  )
}
