"use client"

import { useState } from "react"
import { UseFormReturn } from "react-hook-form"
import {
  Waves,
  Flag,
  HeartPulse,
  Grid2x2,
  Radio,
  Fingerprint,
  SquareParking,
  Plus,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AddCmsProjectFormValues } from "@/types/add-cms-project.types"

const icons: LucideIcon[] = [Waves, Flag, HeartPulse, Grid2x2, Radio, Fingerprint, SquareParking, Grid2x2]

export function StepAmenities({
  form,
  onNext,
  onPrevious,
}: {
  form: UseFormReturn<AddCmsProjectFormValues>
  onNext: () => void
  onPrevious: () => void
}) {
  const { register } = form
  const [selectedIcon, setSelectedIcon] = useState(0)

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Amenities</h3>

      <div className="grid grid-cols-[1fr_260px] gap-6">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Describe Amenities</label>
          <Textarea rows={5} {...register("amenities_description")} />
        </div>

        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">Choose Icon</p>
          <div className="grid grid-cols-4 gap-2 rounded-lg border border-border bg-card p-3">
            {icons.map((Icon, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIcon(i)}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border border-border text-brand-deepblue",
                  selectedIcon === i && "border-brand-deepblue bg-brand-skyblue-ghost"
                )}
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button type="button" variant="outline">
        Add New
        <Plus className="size-4" />
      </Button>

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
          Proceed to Section E →
        </Button>
      </div>
    </div>
  )
}
