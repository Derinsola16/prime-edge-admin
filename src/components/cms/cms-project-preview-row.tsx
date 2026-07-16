import Image from "next/image"
import { MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ICmsProject } from "@/types/cms.types"

export function CmsProjectPreviewRow({ project }: { project: ICmsProject }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-0">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image src={project.hero_image_url} alt={project.name} fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{project.name}</p>
          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            {project.location}
          </p>
        </div>
      </div>

      <Badge
        variant="outline"
        className="rounded-full border-orange-400 text-xs font-medium text-orange-500"
      >
        {project.status === "construction"
          ? `Construction: ${project.construction_progress}%`
          : "Completed"}
      </Badge>
    </div>
  )
}
