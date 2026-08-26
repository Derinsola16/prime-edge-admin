import Image from "next/image"
import Link from "next/link"
import { MapPin, BedDouble, Star, Building2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { IProperty } from "@/types/property.types"
import {
  formatNaira,
  formatPropertyType,
  getPropertyStatusLabel,
  getPropertyStatusClassName,
} from "@/helpers/functions/property"

export function PropertyRow({ property }: { property: IProperty }) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="flex flex-col gap-3 border-b border-border py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
          {property.thumbnail_url ? (
            <Image
              src={property.thumbnail_url}
              alt={property.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <Building2 className="size-5" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-foreground">
            {property.name}
            {property.isFeatured && (
              <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />
            )}
          </p>
          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            {property.location}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground sm:hidden">
            {formatPropertyType(property.type)}
            {property.bedrooms !== undefined && (
              <>
                <span>•</span>
                <BedDouble className="size-3.5 shrink-0" />
                {property.bedrooms}
              </>
            )}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
        <span className="text-sm font-semibold text-foreground">
          {property.priceLabel || formatNaira(property.price)}
        </span>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "rounded-full text-xs font-medium",
              getPropertyStatusClassName(property.status)
            )}
          >
            {getPropertyStatusLabel(property.status)}
          </Badge>

          {!property.isPublished && (
            <Badge variant="outline" className="rounded-full border-border text-xs font-medium text-muted-foreground">
              Draft
            </Badge>
          )}
        </div>
      </div>
    </Link>
  )
}
