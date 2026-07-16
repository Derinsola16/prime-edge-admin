import Image from "next/image"
import { MapPin } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { IFundedProject } from "@/types/analytics.types"

const badgeTone: Record<IFundedProject["badge_tone"], string> = {
  destructive: "bg-destructive/10 text-destructive",
  warning: "bg-orange-100 text-orange-600",
  info: "bg-muted text-foreground",
}

export function MostFundedProjects({ projects }: { projects: IFundedProject[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Most Funded Project</h3>
        <Button variant="link" size="sm" className="text-brand-skyblue">
          View all Projects
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image src={project.image_url} alt={project.name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{project.name}</p>
                <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0" />
                  {project.location} • {project.units} units
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-foreground">
                {project.funded_percent}% funded
              </p>
              <span
                className={cn(
                  "mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                  badgeTone[project.badge_tone]
                )}
              >
                {project.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
