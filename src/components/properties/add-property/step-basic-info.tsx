import { UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AddPropertyFormValues, PaymentPlanOption } from "@/types/add-property.types"
import { BoxedRadioOption, BoxedCheckboxOption } from "@/components/properties/add-property/boxed-option"

const paymentPlanOptions: { value: PaymentPlanOption; label: string }[] = [
  { value: "one_time", label: "One time" },
  { value: "12_months", label: "12 months" },
  { value: "24_months", label: "24 months" },
]

export function StepBasicInfo({
  form,
  onNext,
}: {
  form: UseFormReturn<AddPropertyFormValues>
  onNext: () => void
}) {
  const { register, watch, setValue } = form
  const category = watch("category")
  const feature = watch("feature_property")
  const paymentPlan = watch("payment_plan")

  const togglePaymentPlan = (value: PaymentPlanOption) => {
    setValue(
      "payment_plan",
      paymentPlan.includes(value)
        ? paymentPlan.filter(p => p !== value)
        : [...paymentPlan, value]
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Section 1 of 5</p>
        <h2 className="text-xl font-semibold text-foreground">
          Basic Information
        </h2>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Property name
        </label>
        <Input placeholder="Name" className="h-12" {...register("property_name")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Location</label>
          <Input placeholder="Name" className="h-12" {...register("location")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Project type
          </label>
          <Input
            placeholder="E.g The Haven"
            className="h-12"
            {...register("project_type")}
          />
        </div>
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
        <label className="text-sm font-medium text-foreground">
          Project description or Overview
        </label>
        <Textarea rows={5} {...register("description")} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Duration</label>
          <Input
            placeholder="E.g 24months"
            className="h-12"
            {...register("duration")}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            No of Bedrooms
          </label>
          <Input
            type="number"
            placeholder="0"
            className="h-12"
            {...register("bedrooms")}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Number of Units
          </label>
          <Input
            type="number"
            placeholder="0"
            className="h-12"
            {...register("units")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Projected IRR
          </label>
          <Input
            placeholder="E.g 18.5%"
            className="h-12"
            {...register("projected_irr")}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Feature Property?
          </label>
          <div className="flex gap-4">
            <BoxedRadioOption
              label="Yes"
              checked={feature === "yes"}
              onSelect={() => setValue("feature_property", "yes")}
            />
            <BoxedRadioOption
              label="No"
              checked={feature === "no"}
              onSelect={() => setValue("feature_property", "no")}
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Payment Plan
        </label>
        <div className="flex gap-4">
          {paymentPlanOptions.map(option => (
            <BoxedCheckboxOption
              key={option.value}
              label={option.label}
              checked={paymentPlan.includes(option.value)}
              onToggle={() => togglePaymentPlan(option.value)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Full Address
        </label>
        <Input placeholder="Address" className="h-12" {...register("full_address")} />
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
