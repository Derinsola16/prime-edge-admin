import { type LucideIcon } from "lucide-react"

export function SectionCard({
  icon: Icon,
  title,
  action,
  children,
}: {
  icon: LucideIcon
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
            <Icon className="size-[18px]" />
          </span>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        {action}
      </div>

      {children}
    </div>
  )
}
