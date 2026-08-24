"use client"

import Link from "next/link"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { ApiErrorResponse } from "@/types/api.types"
import { ADD_PROPERTY_STEPS, AddPropertyFormValues, PendingImage } from "@/types/add-property.types"
import {
  addPropertyImage,
  createProperty,
  getProjectOptions,
  uploadPropertyFloorPlan,
} from "@/services/api/properties"
import { buildCreatePropertyPayload } from "@/helpers/functions/add-property"
import { StepMedia } from "@/components/properties/add-property/step-media"
import { StepPricing } from "@/components/properties/add-property/step-pricing"
import { StepFeatures } from "@/components/properties/add-property/step-features"
import { StepBasicInfo } from "@/components/properties/add-property/step-basic-info"
import { WizardStepIndicator } from "@/components/shared/wizard-step-indicator"
import { StepReviewPublish } from "@/components/properties/add-property/step-review-publish"
import { PublishSuccessDialog } from "@/components/shared/publish-success-dialog"

const defaultValues: AddPropertyFormValues = {
  projectId: "",
  title: "",
  type: "",
  description: "",
  bedrooms: "",
  bathrooms: "",
  toilets: "",
  parkingSpaces: "",
  floor: "",
  totalFloors: "",
  size: "",
  isFeatured: false,
  price: "",
  priceLabel: "",
  serviceCharge: "",
  paymentPlans: ["one_time"],
  virtualTourUrl: "",
  features: [],
  status: "available",
  publishNow: false,
}

export default function AddPropertyPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [stepIndex, setStepIndex] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [createdId, setCreatedId] = useState<string | null>(null)

  const form = useForm<AddPropertyFormValues>({ defaultValues })

  const [heroImage, setHeroImage] = useState<PendingImage | null>(null)
  const [galleryImages, setGalleryImages] = useState<PendingImage[]>([])
  const [floorPlanImage, setFloorPlanImage] = useState<PendingImage | null>(null)

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["project-options"],
    queryFn: () => getProjectOptions(),
  })

  const publishMutation = useMutation({
    mutationFn: async () => {
      const values = form.getValues()
      const payload = buildCreatePropertyPayload(values)
      const created = await createProperty(values.projectId, payload)
      const id = created.data.id

      const imagesToUpload = [heroImage, ...galleryImages].filter(
        (img): img is PendingImage => img !== null
      )
      for (const img of imagesToUpload) {
        try {
          await addPropertyImage(id, img.file)
        } catch {
          toast.error(`Failed to upload ${img.file.name}`)
        }
      }

      if (floorPlanImage) {
        try {
          await uploadPropertyFloorPlan(id, floorPlanImage.file)
        } catch {
          toast.error("Failed to upload floor plan")
        }
      }

      return id
    },
    onSuccess: id => {
      setCreatedId(id)
      queryClient.invalidateQueries({ queryKey: ["properties"] })
      queryClient.invalidateQueries({ queryKey: ["property-metrics"] })
      setShowSuccess(true)
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to publish property")
    },
  })

  const goNext = () => setStepIndex(i => Math.min(i + 1, ADD_PROPERTY_STEPS.length - 1))
  const goPrevious = () => setStepIndex(i => Math.max(i - 1, 0))

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

      <div className="flex items-center gap-2">
        <Link href="/properties" className="text-foreground">
          <ChevronLeft className="size-5" />
        </Link>
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Add Property
        </h1>
      </div>

      <WizardStepIndicator steps={ADD_PROPERTY_STEPS} currentIndex={stepIndex} />

      <div className="rounded-xl border border-border bg-card p-4 sm:p-8">
        {currentStep.id === "basic-info" && (
          <StepBasicInfo
            form={form}
            projects={projects}
            projectsLoading={projectsLoading}
            onNext={goNext}
          />
        )}
        {currentStep.id === "pricing" && (
          <StepPricing form={form} onNext={goNext} onPrevious={goPrevious} />
        )}
        {currentStep.id === "media" && (
          <StepMedia
            form={form}
            heroImage={heroImage}
            onHeroChange={file =>
              setHeroImage(file ? { file, previewUrl: URL.createObjectURL(file) } : null)
            }
            galleryImages={galleryImages}
            onGalleryAdd={file =>
              setGalleryImages(imgs => [...imgs, { file, previewUrl: URL.createObjectURL(file) }])
            }
            onGalleryRemove={index => setGalleryImages(imgs => imgs.filter((_, i) => i !== index))}
            floorPlanImage={floorPlanImage}
            onFloorPlanChange={file =>
              setFloorPlanImage(file ? { file, previewUrl: URL.createObjectURL(file) } : null)
            }
            onNext={goNext}
            onPrevious={goPrevious}
          />
        )}
        {currentStep.id === "features" && (
          <StepFeatures form={form} onNext={goNext} onPrevious={goPrevious} />
        )}
        {currentStep.id === "review-publish" && (
          <StepReviewPublish
            form={form}
            projects={projects}
            heroImage={heroImage}
            galleryImages={galleryImages}
            floorPlanImage={floorPlanImage}
            onPrevious={goPrevious}
            isPublishing={publishMutation.isPending}
            onPublish={() => publishMutation.mutate()}
          />
        )}
      </div>

      <PublishSuccessDialog
        open={showSuccess}
        description={
          form.getValues("publishNow")
            ? "Your property has been published and is now visible on the website."
            : "Your property has been saved as a draft. Publish it any time from the property page."
        }
        onOpenChange={open => {
          setShowSuccess(open)
          if (!open && createdId) router.push(`/properties/${createdId}`)
        }}
      />
    </div>
  )
}
