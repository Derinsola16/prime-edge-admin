import { UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PAYMENT_PLAN_OPTIONS, AddPropertyFormValues, PaymentPlanOption } from "@/types/add-property.types"
import { BoxedCheckboxOption } from "@/components/properties/add-property/boxed-option"

export function StepPricing({
  form,
  onNext,
  onPrevious,
}: {
  form: UseFormReturn<AddPropertyFormValues>
  onNext: () => void
  onPrevious: () => void
}) {
  const { register, watch, setValue } = form
  const paymentPlans = watch("paymentPlans")
  const price = watch("price")

  const togglePlan = (value: PaymentPlanOption) => {
    setValue(
      "paymentPlans",
      paymentPlans.includes(value)
        ? paymentPlans.filter(p => p !== value)
        : [...paymentPlans, value]
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Section 2 of 5</p>
        <h2 className="text-xl font-semibold text-foreground">Pricing</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Price</label>
          <Input placeholder="Enter Amount" className="h-12" {...register("price")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Price Label <span className="text-muted-foreground">(optional)</span>
          </label>
          <Input placeholder="E.g ₦85,000,000" className="h-12" {...register("priceLabel")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Service Charge <span className="text-muted-foreground">(optional, yearly)</span>
        </label>
        <Input placeholder="Enter Amount" className="h-12" {...register("serviceCharge")} />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Payment Plans</label>
        <div className="flex flex-wrap gap-4">
          {PAYMENT_PLAN_OPTIONS.map(option => (
            <BoxedCheckboxOption
              key={option.value}
              label={option.name}
              checked={paymentPlans.includes(option.value)}
              onToggle={() => togglePlan(option.value)}
            />
          ))}
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
          disabled={!price.trim()}
          className="h-12 flex-1 rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
        >
          Proceed to Section C →
        </Button>
      </div>
    </div>
  )
}
