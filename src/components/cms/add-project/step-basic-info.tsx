import { UseFormReturn } from "react-hook-form"
import { FileText } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AddCmsProjectFormValues } from "@/types/add-cms-project.types"
import { BoxedRadioOption } from "@/components/properties/add-property/boxed-option"

export function StepBasicInfo({
  form,
  onNext,
}: {
  form: UseFormReturn<AddCmsProjectFormValues>
  onNext: () => void
}) {
  const { register, watch, setValue } = form
  const category = watch("category")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Project Name</label>
          <Input placeholder="E.g The Haven" className="h-12" {...register("project_name")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Tagline</label>
          <Input
            placeholder="E.g A private location, thoughtfully created for refined urban living"
            className="h-12"
            {...register("tagline")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Estimated Delivery</label>
          <Input placeholder="E.g Q4 2026" className="h-12" {...register("estimated_delivery")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Location</label>
          <Input placeholder="Location" className="h-12" {...register("location")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Hero Image</label>
        <div className="flex h-52 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
          Upload hero image
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Overview</label>
        <Textarea rows={5} {...register("overview")} />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Category</label>
        <div className="flex gap-4">
          <BoxedRadioOption
            label="Residential"
            checked={category === "residential"}
            onSelect={() => setValue("category", "residential")}
          />
          <BoxedRadioOption
            label="Commercial"
            checked={category === "commercial"}
            onSelect={() => setValue("category", "commercial")}
          />
          <BoxedRadioOption
            label="Mixed Use"
            checked={category === "mixed_use"}
            onSelect={() => setValue("category", "mixed_use")}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Full Address</label>
        <Input placeholder="Address" className="h-12" {...register("full_address")} />
      </div>

      <div className="space-y-1.5">
        <p className="text-sm font-medium text-foreground">Brochure</p>
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-10">
          <FileText className="size-6 text-muted-foreground" />
          <p className="text-sm font-semibold text-foreground">Upload Brochure</p>
          <p className="text-xs text-muted-foreground">PDF, MAX 25MB</p>
        </div>
      </div>

      <Button
        type="button"
        onClick={onNext}
        className="h-12 w-full rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
      >
        Proceed to Section B →
      </Button>
    </div>
  )
}
