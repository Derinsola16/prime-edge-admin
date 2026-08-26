import { UseFormReturn } from "react-hook-form"
import { ImagePlus, Bold, Italic, List, Link2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AddCmsProjectFormValues } from "@/types/add-cms-project.types"

function RichTextField({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="rounded-lg border border-border">
      <div className="flex items-center gap-3 border-b border-border px-3 py-2 text-muted-foreground">
        <Bold className="size-4" />
        <Italic className="size-4" />
        <List className="size-4" />
        <span className="h-4 w-px bg-border" />
        <Link2 className="size-4" />
      </div>
      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={5}
        className="rounded-t-none border-0"
      />
    </div>
  )
}

export function StepContent({
  form,
  onNext,
  onPrevious,
}: {
  form: UseFormReturn<AddCmsProjectFormValues>
  onNext: () => void
  onPrevious: () => void
}) {
  const { register, watch, setValue } = form

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">About the Project</p>
          <RichTextField
            value={watch("about_project")}
            onChange={v => setValue("about_project", v)}
          />
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">Section Featured Image</p>
          <div className="flex h-full min-h-[190px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/40">
            <ImagePlus className="size-6 text-muted-foreground" />
            <p className="text-sm font-semibold text-foreground">Upload Featured Photo</p>
            <p className="text-xs text-muted-foreground">Landscape orientation recommended</p>
          </div>
        </div>
      </div>

      <Button type="button" variant="outline">
        Add New Section +
      </Button>

      <div className="border-t border-border pt-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Value Proposition</h3>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Heading</label>
            <Input
              placeholder="E.g Designed for Those Who Understand Value"
              className="h-12"
              {...register("heading")}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Tagline</label>
            <Input
              placeholder="E.g A private location, thoughtfully created for refined urban living"
              className="h-12"
              {...register("value_tagline")}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Subtext</label>
            <Textarea rows={5} {...register("subtext")} />
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-foreground">Bullet Points</p>
            <RichTextField
              value={watch("bullet_points")}
              onChange={v => setValue("bullet_points", v)}
            />
          </div>
        </div>
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
          onClick={onNext}
          className="h-12 flex-1 rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
        >
          Proceed to Section D →
        </Button>
      </div>
    </div>
  )
}
