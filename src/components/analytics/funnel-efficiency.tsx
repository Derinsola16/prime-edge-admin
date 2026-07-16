import { IFunnelStep } from "@/types/analytics.types"

export function FunnelEfficiency({ steps }: { steps: IFunnelStep[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground">Funnel Efficiency</h3>
      <p className="mb-4 text-sm text-muted-foreground">Platform conversion cycle</p>

      <div className="space-y-5">
        {steps.map(step => (
          <div key={step.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{step.label}</span>
              <span className="font-semibold text-foreground">
                {step.value.toLocaleString()}
              </span>
            </div>
            <p className="mb-1.5 text-xs text-muted-foreground">{step.note}</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${step.percent}%`, backgroundColor: step.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
