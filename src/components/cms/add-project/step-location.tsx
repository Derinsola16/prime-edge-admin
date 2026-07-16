import { UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AddCmsProjectFormValues } from "@/types/add-cms-project.types"

export function StepLocation({
  form,
  onPublish,
  onPrevious,
  isPublishing,
}: {
  form: UseFormReturn<AddCmsProjectFormValues>
  onPublish: () => void
  onPrevious: () => void
  isPublishing?: boolean
}) {
  const { register } = form

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Location & Map</h3>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Full Address</label>
        <Input placeholder="Type & select" className="h-12" {...register("map_address")} />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Location Description</label>
        <Textarea rows={6} {...register("location_description")} />
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="h-12 flex-1 rounded-full"
        >
          ← Previous
        </Button>
        <Button
          type="button"
          onClick={onPublish}
          disabled={isPublishing}
          className="h-12 flex-1 rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
        >
          {isPublishing ? "Publishing…" : "Publish"}
        </Button>
      </div>
    </div>
  )
}
