import { cn } from "@/lib/utils"

export type WizardStep = { id: string; letter: string; label: string }

export function WizardStepIndicator({
  steps,
  currentIndex,
}: {
  steps: WizardStep[]
  currentIndex: number
}) {
  return (
    <div className="flex items-center rounded-xl border border-border bg-card p-6">
      {steps.map((step, i) => (
        <div key={step.id} className="flex flex-1 items-center last:flex-initial">
          <div className="flex flex-col items-center gap-2">
            <span
              className={cn(
                "flex size-10 items-center justify-center rounded-full text-sm font-semibold",
                i <= currentIndex
                  ? "bg-brand-deepblue text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step.letter}
            </span>
            <span className="text-xs font-medium whitespace-nowrap text-foreground">
              {step.label}
            </span>
          </div>

          {i < steps.length - 1 && (
            <div className="mx-3 h-1 flex-1 rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full bg-orange-400 transition-all",
                  i < currentIndex ? "w-full" : "w-0"
                )}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
