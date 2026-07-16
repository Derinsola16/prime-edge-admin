"use client"

import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Save, ChevronLeft } from "lucide-react"
import { useMutation } from "@tanstack/react-query"

import { createProperty } from "@/services/api/properties"
import { ADD_PROPERTY_STEPS, AddPropertyFormValues } from "@/types/add-property.types"
import { StepFinance } from "@/components/properties/add-property/step-finance"
import { StepAmenities } from "@/components/properties/add-property/step-amenities"
import { StepBasicInfo } from "@/components/properties/add-property/step-basic-info"
import { WizardStepIndicator } from "@/components/shared/wizard-step-indicator"
import { StepMediaDocs } from "@/components/properties/add-property/step-media-docs"
import { StepReviewPublish } from "@/components/properties/add-property/step-review-publish"
import { PublishSuccessDialog } from "@/components/shared/publish-success-dialog"

const defaultValues: AddPropertyFormValues = {
  property_name: "",
  location: "",
  project_type: "",
  category: "residential",
  description: "",
  duration: "",
  bedrooms: "",
  units: "",
  projected_irr: "",
  feature_property: "no",
  payment_plan: ["one_time", "12_months", "24_months"],
  full_address: "",
  property_price: "",
  min_investment: "",
  finance_projected_irr: "",
  exp_cash_yield: "",
  virtual_tour_link: "",
  amenities: [],
}

export default function AddPropertyPage() {
  const router = useRouter()
  const [stepIndex, setStepIndex] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const form = useForm<AddPropertyFormValues>({ defaultValues })

  const publishMutation = useMutation({
    mutationFn: () => createProperty(form.getValues()),
    onSuccess: () => setShowSuccess(true),
    onError: () => toast.error("Failed to publish property"),
  })

  const goNext = () => setStepIndex(i => Math.min(i + 1, ADD_PROPERTY_STEPS.length - 1))
  const goPrevious = () => setStepIndex(i => Math.max(i - 1, 0))

  const handleSaveDraft = () => {
    toast.success("Draft saved")
  }

  const currentStep = ADD_PROPERTY_STEPS[stepIndex]

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/properties" className="hover:text-foreground">
          Property Manager
        </Link>
        <span>/</span>
        <span className="text-foreground">Add Property</span>
      </nav>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/properties" className="text-foreground">
            <ChevronLeft className="size-5" />
          </Link>
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Add Property
          </h1>
        </div>

        <button
          onClick={handleSaveDraft}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Save As Draft
          <Save className="size-4" />
        </button>
      </div>

      <WizardStepIndicator steps={ADD_PROPERTY_STEPS} currentIndex={stepIndex} />

      <div className="rounded-xl border border-border bg-card p-8">
        {currentStep.id === "basic-info" && (
          <StepBasicInfo form={form} onNext={goNext} />
        )}
        {currentStep.id === "finance" && (
          <StepFinance form={form} onNext={goNext} onPrevious={goPrevious} />
        )}
        {currentStep.id === "media-docs" && (
          <StepMediaDocs form={form} onNext={goNext} onPrevious={goPrevious} />
        )}
        {currentStep.id === "amenities" && (
          <StepAmenities form={form} onNext={goNext} onPrevious={goPrevious} />
        )}
        {currentStep.id === "review-publish" && (
          <StepReviewPublish
            form={form}
            onPrevious={goPrevious}
            isPublishing={publishMutation.isPending}
            onPublish={() => publishMutation.mutate()}
          />
        )}
      </div>

      <PublishSuccessDialog
        open={showSuccess}
        onOpenChange={open => {
          setShowSuccess(open)
          if (!open) router.push("/properties")
        }}
      />
    </div>
  )
}
