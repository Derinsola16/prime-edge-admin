import Image from "next/image"
import { LayoutPanelTop } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionCard } from "@/components/properties/section-card"

export function PropertyFloorPlan({ imageUrl }: { imageUrl: string }) {
  return (
    <SectionCard
      icon={LayoutPanelTop}
      title="Floor Plan"
      action={
        <Button variant="link" size="sm" className="text-brand-skyblue">
          View Full
        </Button>
      }
    >
      <div className="relative h-48 overflow-hidden rounded-lg bg-muted">
        <Image src={imageUrl} alt="Floor plan" fill className="object-cover" />
      </div>
    </SectionCard>
  )
}
