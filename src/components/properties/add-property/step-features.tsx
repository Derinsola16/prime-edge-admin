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

const presetFeatures: { label: string; icon: LucideIcon }[] = [
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

export function StepFeatures({
  form,
  onNext,
  onPrevious,
}: {
  form: UseFormReturn<AddPropertyFormValues>
  onNext: () => void
  onPrevious: () => void
}) {
  const { watch, setValue } = form
  const features = watch("features")
  const [draft, setDraft] = useState("")

  const toggle = (label: string) => {
    setValue(
      "features",
      features.includes(label)
        ? features.filter(a => a !== label)
        : [...features, label]
    )
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && draft.trim()) {
      e.preventDefault()
      if (!features.includes(draft.trim())) {
        setValue("features", [...features, draft.trim()])
      }
      setDraft("")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Section 4 of 5</p>
        <h2 className="text-xl font-semibold text-foreground">Features</h2>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Type and Press enter
        </label>
        <Input
          placeholder="E.g Rooftop lounge"
          className="h-12"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="space-y-3 border-t border-border pt-6">
        <p className="text-sm font-medium text-foreground">Or Select from below</p>
        <div className="flex flex-wrap gap-3">
          {presetFeatures.map(item => {
            const selected = features.includes(item.label)

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

      {features.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-border pt-6">
          {features.map(label => (
            <span
              key={label}
              className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground"
            >
              {label}
              <button type="button" onClick={() => toggle(label)} className="text-muted-foreground hover:text-foreground">
                ×
              </button>
            </span>
          ))}
        </div>
      )}

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
