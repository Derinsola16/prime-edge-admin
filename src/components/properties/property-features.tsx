import { Sparkles } from "lucide-react"

export function PropertyFeatures({ features }: { features: string[] }) {
  if (features.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8">
        <h3 className="mb-2 text-lg font-semibold text-foreground">Features</h3>
        <p className="text-sm text-muted-foreground">No features listed for this property yet.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <h3 className="mb-6 text-lg font-semibold text-foreground">Features</h3>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
        {features.map(feature => (
          <div key={feature} className="flex flex-col items-center text-center">
            <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
              <Sparkles className="size-6" />
            </span>
            <p className="text-sm text-muted-foreground">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
