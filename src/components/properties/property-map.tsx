import { MapPin } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

export function PropertyMap({ address }: { address: string }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  return (
    <div className="relative flex h-[240px] flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-border bg-[repeating-linear-gradient(45deg,theme(colors.muted.DEFAULT)_0,theme(colors.muted.DEFAULT)_1px,transparent_1px,transparent_16px)] bg-secondary p-6 text-center sm:h-[280px]">
      <MapPin className="size-10 text-brand-deepblue/30" />

      <p className="max-w-sm text-sm text-muted-foreground">{address}</p>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({
          className: "relative rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover",
        })}
      >
        <MapPin className="size-4" />
        View on Map
      </a>
    </div>
  )
}
