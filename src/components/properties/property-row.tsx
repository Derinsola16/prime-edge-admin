import Image from "next/image"
import Link from "next/link"
import { MapPin, ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { IProperty } from "@/types/property.types"
import {
  getPropertyStatusLabel,
  getPropertyStatusClassName,
} from "@/helpers/functions/property"

export function PropertyRow({ property }: { property: IProperty }) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-0"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={property.thumbnail_url}
            alt={property.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {property.name}
          </p>
          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            {property.location} • {property.units} units
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <Badge
          variant="outline"
          className={cn(
            "rounded-full text-xs font-medium",
            getPropertyStatusClassName(property)
          )}
        >
          {getPropertyStatusLabel(property)}
        </Badge>

        <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
          <ShieldCheck className="size-3.5" />
          Verify Truscrow
        </span>
      </div>
    </Link>
  )
}
