import Image from "next/image"
import Link from "next/link"
import { MapPin, Pencil } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { ICmsProject } from "@/types/cms.types"

export function CmsProjectCard({ project }: { project: ICmsProject }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative h-56 w-full">
        <Image src={project.hero_image_url} alt={project.name} fill className="object-cover" />
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-foreground">{project.name}</h3>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3.5" />
              {project.location} •{" "}
              <span className="font-medium text-foreground">{project.units_sold}</span> of{" "}
              {project.total_units} Units sold
            </p>
          </div>

          <Link
            href={`/cms/projects/${project.id}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Edit
            <Pencil className="size-3.5" />
          </Link>
        </div>

        <div className="flex gap-2">
          {project.status === "construction" && (
            <Badge
              variant="outline"
              className="rounded-full border-orange-400 text-xs font-medium text-orange-500"
            >
              Construction: {project.construction_progress}%
            </Badge>
          )}
          {project.status === "completed" && (
            <Badge
              variant="outline"
              className="rounded-full border-transparent bg-success/10 text-xs font-medium text-success"
            >
              Completed
            </Badge>
          )}
          {project.sold_out && (
            <Badge
              variant="outline"
              className={cn(
                "rounded-full border-transparent bg-destructive/10 text-xs font-medium text-destructive"
              )}
            >
              Sold out
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
