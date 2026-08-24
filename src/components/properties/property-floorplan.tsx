"use client"

import Image from "next/image"
import { useRef } from "react"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { Upload, LayoutPanelTop } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { ApiErrorResponse } from "@/types/api.types"
import { SectionCard } from "@/components/properties/section-card"
import { uploadPropertyFloorPlan } from "@/services/api/properties"

export function PropertyFloorPlan({
  imageUrl,
  propertyId,
}: {
  imageUrl?: string
  propertyId?: string
}) {
  const queryClient = useQueryClient()
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadPropertyFloorPlan(propertyId!, file),
    onSuccess: () => {
      toast.success("Floor plan uploaded")
      queryClient.invalidateQueries({ queryKey: ["property", propertyId] })
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to upload floor plan")
    },
  })

  return (
    <SectionCard
      icon={LayoutPanelTop}
      title="Floor Plan"
      action={
        propertyId && (
          <>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) uploadMutation.mutate(file)
                e.target.value = ""
              }}
            />
            <Button
              variant="link"
              size="sm"
              className="text-brand-skyblue"
              disabled={uploadMutation.isPending}
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="size-3.5" />
              {uploadMutation.isPending ? "Uploading…" : imageUrl ? "Replace" : "Upload"}
            </Button>
          </>
        )
      }
    >
      {imageUrl ? (
        <div className="relative h-48 overflow-hidden rounded-lg bg-muted">
          <Image
            src={imageUrl}
            alt="Floor plan"
            fill
            sizes="(max-width: 1024px) 100vw, 700px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
          No floor plan uploaded yet
        </div>
      )}
    </SectionCard>
  )
}
