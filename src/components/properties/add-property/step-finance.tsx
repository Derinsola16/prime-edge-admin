import { UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AddPropertyFormValues, PaymentPlanOption } from "@/types/add-property.types"
import { BoxedCheckboxOption } from "@/components/properties/add-property/boxed-option"

const paymentPlanOptions: { value: PaymentPlanOption; label: string }[] = [
  { value: "one_time", label: "One time" },
  { value: "12_months", label: "12 months" },
  { value: "24_months", label: "24 months" },
]

export function StepFinance({
  form,
  onNext,
  onPrevious,
}: {
  form: UseFormReturn<AddPropertyFormValues>
  onNext: () => void
  onPrevious: () => void
}) {
  const { register, watch, setValue } = form
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
        <p className="text-sm text-muted-foreground">Section 2 of 5</p>
        <h2 className="text-xl font-semibold text-foreground">Finance</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Property Price
          </label>
          <Input
            placeholder="Enter Amount"
            className="h-12"
            {...register("property_price")}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Min Investment
          </label>
          <Input
            placeholder="Enter Amount"
            className="h-12"
            {...register("min_investment")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Projected IRR
          </label>
          <Input placeholder="In %" className="h-12" {...register("finance_projected_irr")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Exp. Cash Yield
          </label>
          <Input placeholder="In %" className="h-12" {...register("exp_cash_yield")} />
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
          Proceed to Section C →
        </Button>
      </div>
    </div>
  )
}
