export function KycSectionCard({
  step,
  total,
  title,
  subtitle,
  children,
}: {
  step: number
  total: number
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <p className="text-sm text-muted-foreground">
        Section {step} of {total}
      </p>
      <h3 className="mb-1 text-lg font-semibold text-foreground">{title}</h3>
      {subtitle && <p className="mb-4 text-sm text-muted-foreground">{subtitle}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  )
}
