import { UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AddPropertyFormValues } from "@/types/add-property.types"
import { PRODUCT_TYPE_OPTIONS } from "@/types/property.types"
import { IProjectOption } from "@/services/api/properties"
import { BoxedRadioOption } from "@/components/properties/add-property/boxed-option"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function StepBasicInfo({
  form,
  projects,
  projectsLoading,
  onNext,
}: {
  form: UseFormReturn<AddPropertyFormValues>
  projects: IProjectOption[]
  projectsLoading: boolean
  onNext: () => void
}) {
  const { register, watch, setValue } = form
  const projectId = watch("projectId")
  const type = watch("type")
  const isFeatured = watch("isFeatured")

  const canProceed = Boolean(projectId && watch("title").trim() && type)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Section 1 of 5</p>
        <h2 className="text-xl font-semibold text-foreground">
          Basic Information
        </h2>
      </div>

      {!projectsLoading && projects.length === 0 && (
        <p className="rounded-lg border border-dashed border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          No projects exist yet. A property must belong to a project — create one in Website CMS →
          Projects first.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Project</label>
          <Select value={projectId} onValueChange={v => setValue("projectId", v ?? "")}>
            <SelectTrigger className="h-12 w-full">
              <SelectValue placeholder={projectsLoading ? "Loading projects…" : "Select a project"} />
            </SelectTrigger>
            <SelectContent>
              {projects.map(p => (
                <SelectItem key={p.id} value={p.id}>
                  {p.title} • {p.location.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Property Type</label>
          <Select
            value={type}
            onValueChange={v => setValue("type", (v ?? "") as AddPropertyFormValues["type"])}
          >
            <SelectTrigger className="h-12 w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_TYPE_OPTIONS.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Property name</label>
        <Input placeholder="E.g 4 Bedroom Terrace + BQ" className="h-12" {...register("title")} />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Description</label>
        <Textarea rows={5} placeholder="Describe this property…" {...register("description")} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Bedrooms</label>
          <Input type="number" min={0} placeholder="0" className="h-12" {...register("bedrooms")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Bathrooms</label>
          <Input type="number" min={0} placeholder="0" className="h-12" {...register("bathrooms")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Toilets</label>
          <Input type="number" min={0} placeholder="0" className="h-12" {...register("toilets")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Parking</label>
          <Input type="number" min={0} placeholder="0" className="h-12" {...register("parkingSpaces")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Floor</label>
          <Input type="number" min={0} placeholder="0" className="h-12" {...register("floor")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Size (sqm)</label>
          <Input type="number" min={0} placeholder="0" className="h-12" {...register("size")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Total Floors</label>
          <Input type="number" min={0} placeholder="0" className="h-12" {...register("totalFloors")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Feature this property?</label>
        <div className="flex gap-4">
          <BoxedRadioOption
            label="Yes"
            checked={isFeatured}
            onSelect={() => setValue("isFeatured", true)}
          />
          <BoxedRadioOption
            label="No"
            checked={!isFeatured}
            onSelect={() => setValue("isFeatured", false)}
          />
        </div>
      </div>

      <Button
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className="h-12 w-full rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
      >
        Proceed to Section B →
      </Button>
    </div>
  )
}
