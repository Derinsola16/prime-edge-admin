"use client"

import Link from "next/link"
import { AxiosError } from "axios"
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Save, ChevronLeft } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { ApiErrorResponse } from "@/types/api.types"
import { PendingImage } from "@/types/add-property.types"
import { createCmsProject, uploadCmsProjectCover, addCmsProjectGalleryImage } from "@/services/api/cms"
import { buildCreateCmsProjectPayload } from "@/helpers/functions/add-cms-project"
import { WizardStepIndicator } from "@/components/shared/wizard-step-indicator"
import { PublishSuccessDialog } from "@/components/shared/publish-success-dialog"
import { StepContent } from "@/components/cms/add-project/step-content"
import { StepLocation } from "@/components/cms/add-project/step-location"
import { StepAmenities } from "@/components/cms/add-project/step-amenities"
import { StepBasicInfo } from "@/components/cms/add-project/step-basic-info"
import { StepMediaGallery, CmsGalleryImage } from "@/components/cms/add-project/step-media-gallery"
import { ADD_CMS_PROJECT_STEPS, AddCmsProjectFormValues } from "@/types/add-cms-project.types"

const defaultValues: AddCmsProjectFormValues = {
  project_name: "",
  tagline: "",
  estimated_delivery: "",
  location: "",
  overview: "",
  category: "residential",
  full_address: "",
  status: "upcoming",
  construction_progress: "",
  about_project: "",
  heading: "",
  value_tagline: "",
  subtext: "",
  bullet_points: "",
  amenities_description: "",
  map_address: "",
  location_description: "",
}

export default function CmsAddProjectPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [stepIndex, setStepIndex] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isDraft, setIsDraft] = useState(false)

  const form = useForm<AddCmsProjectFormValues>({ defaultValues })

  const [heroImage, setHeroImage] = useState<PendingImage | null>(null)
  const [galleryImages, setGalleryImages] = useState<CmsGalleryImage[]>([])

  const publishMutation = useMutation({
    mutationFn: async (publish: boolean) => {
      const payload = buildCreateCmsProjectPayload(form.getValues(), publish)
      const created = await createCmsProject(payload)
      const id = created.data.id

      if (heroImage) {
        try {
          await uploadCmsProjectCover(id, heroImage.file)
        } catch {
          toast.error("Failed to upload hero image")
        }
      }

      for (const img of galleryImages) {
        try {
          await addCmsProjectGalleryImage(id, img.file, img.category)
        } catch {
          toast.error(`Failed to upload ${img.file.name}`)
        }
      }

      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-projects"] })
      queryClient.invalidateQueries({ queryKey: ["cms-metrics"] })
      setShowSuccess(true)
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to publish project")
    },
  })

  const goNext = () =>
    setStepIndex(i => Math.min(i + 1, ADD_CMS_PROJECT_STEPS.length - 2))
  const goPrevious = () => setStepIndex(i => Math.max(i - 1, 0))

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/cms" className="hover:text-foreground">
          Website CMS
        </Link>
        <span>/</span>
        <Link href="/cms/projects" className="hover:text-foreground">
          Projects
        </Link>
        <span>/</span>
        <span className="text-foreground">Add Project</span>
      </nav>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/cms/projects" className="text-foreground">
            <ChevronLeft className="size-5" />
          </Link>
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Add Project
          </h1>
        </div>

        <button
          onClick={() => {
            setIsDraft(true)
            publishMutation.mutate(false)
          }}
          disabled={publishMutation.isPending}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-60"
        >
          Save As Draft
          <Save className="size-4" />
        </button>
      </div>

      <WizardStepIndicator steps={ADD_CMS_PROJECT_STEPS} currentIndex={stepIndex} />

      <div className="rounded-xl border border-border bg-card p-8">
        {stepIndex === 0 && (
          <StepBasicInfo
            form={form}
            heroImage={heroImage}
            onHeroChange={file =>
              setHeroImage(file ? { file, previewUrl: URL.createObjectURL(file) } : null)
            }
            onNext={goNext}
          />
        )}
        {stepIndex === 1 && (
          <StepMediaGallery
            images={galleryImages}
            onAdd={(category, file) =>
              setGalleryImages(imgs => [
                ...imgs,
                { category, file, previewUrl: URL.createObjectURL(file) },
              ])
            }
            onRemove={index => setGalleryImages(imgs => imgs.filter((_, i) => i !== index))}
            onNext={goNext}
            onPrevious={goPrevious}
          />
        )}
        {stepIndex === 2 && (
          <StepContent form={form} onNext={goNext} onPrevious={goPrevious} />
        )}
        {stepIndex === 3 && (
          <StepAmenities form={form} onNext={goNext} onPrevious={goPrevious} />
        )}
        {stepIndex === 4 && (
          <StepLocation
            form={form}
            onPrevious={goPrevious}
            isPublishing={publishMutation.isPending}
            onPublish={() => {
              setIsDraft(false)
              publishMutation.mutate(true)
            }}
          />
        )}
      </div>

      <PublishSuccessDialog
        open={showSuccess}
        onOpenChange={open => {
          setShowSuccess(open)
          if (!open) router.push("/cms/projects")
        }}
        description={
          isDraft
            ? 'Your project has been saved as a draft. Publish it any time from the CMS Projects page.'
            : 'A new project has been successfully published. Go to "Projects" to see the new addition.'
        }
      />
    </div>
  )
}
