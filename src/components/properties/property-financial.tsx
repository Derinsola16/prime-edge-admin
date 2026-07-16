import { ChartColumnBig } from "lucide-react"

import { Progress } from "@/components/ui/progress"
import { IPropertyDetail } from "@/types/property.types"
import { SectionCard } from "@/components/properties/section-card"

function formatNaira(value: number) {
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`
  return `₦${value.toLocaleString()}`
}

export function PropertyFinancial({ property }: { property: IPropertyDetail }) {
  const stats = [
    { label: "Target IRR", value: `${property.target_irr}%` },
    { label: "Exp. Cash Yield", value: `${property.exp_cash_yield}%` },
    {
      label: "Min. Investment",
      value: `₦${property.min_investment.toLocaleString()}`,
    },
  ]

  const unitsPercent = Math.round(
    (property.units_bought / (property.units_available + property.units_bought)) * 100
  )

  return (
    <SectionCard icon={ChartColumnBig} title="Financial Performance">
      <div className="mb-8 grid grid-cols-3 gap-4">
        {stats.map(stat => (
          <div key={stat.label}>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2 rounded-lg border border-border p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Funding Progress</span>
          <span className="text-muted-foreground">
            {formatNaira(property.funding_raised)} of{" "}
            {formatNaira(property.funding_target)}
          </span>
        </div>
        <Progress value={property.funding_percent} className="h-2" />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{property.funding_percent}% Funded</span>
          <span>{property.days_left} Days Left</span>
        </div>
      </div>

      <div className="mt-4 space-y-2 rounded-lg border border-border p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">
            {property.units_available} Units available
          </span>
          <span className="text-muted-foreground">
            {property.units_bought} units bought
          </span>
        </div>
        <Progress value={unitsPercent} className="h-2 max-w-[342px]" />
      </div>
    </SectionCard>
  )
}
