import { MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PropertyMap({ address }: { address: string }) {
  return (
    <div className="relative flex h-[406px] items-center justify-center overflow-hidden rounded-xl border border-border bg-[repeating-linear-gradient(45deg,theme(colors.muted.DEFAULT)_0,theme(colors.muted.DEFAULT)_1px,transparent_1px,transparent_16px)] bg-secondary">
      <div className="absolute inset-0 flex items-center justify-center">
        <MapPin className="size-10 text-brand-deepblue/30" />
      </div>

      <Button className="relative rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover">
        <MapPin className="size-4" />
        View on Map
      </Button>

      <span className="sr-only">{address}</span>
    </div>
  )
}
