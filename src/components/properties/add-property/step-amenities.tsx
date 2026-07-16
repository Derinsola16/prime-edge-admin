"use client"

import { useState, KeyboardEvent } from "react"
import { UseFormReturn } from "react-hook-form"
import {
  Zap,
  Waves,
  ShieldCheck,
  Dumbbell,
  SquareParking,
  Wifi,
  Sparkles,
  Trees,
  Sofa,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AddPropertyFormValues } from "@/types/add-property.types"

const presetAmenities: { label: string; icon: LucideIcon }[] = [
  { label: "24/7 Power", icon: Zap },
  { label: "Swimming Pool", icon: Waves },
  { label: "Security", icon: ShieldCheck },
  { label: "GYM", icon: Dumbbell },
  { label: "Private Parking", icon: SquareParking },
  { label: "Fiber Internet", icon: Wifi },
  { label: "Smart Elevator", icon: Sparkles },
  { label: "Roof Top", icon: Trees },
  { label: "Garden", icon: Trees },
  { label: "Lounge", icon: Sofa },
]

export function StepAmenities({
  form,
  onNext,
  onPrevious,
}: {
  form: UseFormReturn<AddPropertyFormValues>
  onNext: () => void
  onPrevious: () => void
}) {
  const { watch, setValue } = form
  const amenities = watch("amenities")
  const [draft, setDraft] = useState("")

  const toggle = (label: string) => {
    setValue(
      "amenities",
      amenities.includes(label)
        ? amenities.filter(a => a !== label)
        : [...amenities, label]
    )
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && draft.trim()) {
      e.preventDefault()
      if (!amenities.includes(draft.trim())) {
        setValue("amenities", [...amenities, draft.trim()])
      }
      setDraft("")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Section 4 of 5</p>
        <h2 className="text-xl font-semibold text-foreground">Amenities</h2>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Type and Press enter
        </label>
        <Input
          placeholder="Enter Amount"
          className="h-12"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="space-y-3 border-t border-border pt-6">
        <p className="text-sm font-medium text-foreground">Or Select from below</p>
        <div className="flex flex-wrap gap-3">
          {presetAmenities.map(item => {
            const selected = amenities.includes(item.label)

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => toggle(item.label)}
                className={cn(
                  "flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground",
                  selected && "border-brand-deepblue bg-brand-skyblue-ghost"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </button>
            )
          })}
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
          Proceed to Section E →
        </Button>
      </div>
    </div>
  )
}
