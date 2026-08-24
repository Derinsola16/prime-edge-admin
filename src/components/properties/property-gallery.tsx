"use client"

import Image from "next/image"
import { useRef } from "react"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { X, ImagePlus, Building2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ApiErrorResponse } from "@/types/api.types"
import { IPropertyImage } from "@/types/property.types"
import { addPropertyImage, removePropertyImage } from "@/services/api/properties"

export function PropertyGallery({
  images,
  propertyId,
}: {
  images: IPropertyImage[]
  propertyId?: string
}) {
  const queryClient = useQueryClient()
  const inputRef = useRef<HTMLInputElement>(null)

  const addMutation = useMutation({
    mutationFn: (file: File) => addPropertyImage(propertyId!, file),
    onSuccess: () => {
      toast.success("Image added")
      queryClient.invalidateQueries({ queryKey: ["property", propertyId] })
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to add image")
    },
  })

  const removeMutation = useMutation({
    mutationFn: (publicId: string) => removePropertyImage(propertyId!, publicId),
    onSuccess: () => {
      toast.success("Image removed")
      queryClient.invalidateQueries({ queryKey: ["property", propertyId] })
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to remove image")
    },
  })

  const editable = Boolean(propertyId)
  const slots = [images[0], images[1], images[2], images[3]]

  return (
    <div>
      <div className="grid h-[280px] grid-cols-2 gap-2 overflow-hidden rounded-xl sm:h-[360px] sm:grid-cols-[1.6fr_1fr_1fr] lg:h-[471px]">
        <GalleryCell image={slots[0]} large editable={editable} onRemove={removeMutation.mutate} />

        <div className="grid grid-rows-2 gap-2">
          <GalleryCell image={slots[1]} editable={editable} onRemove={removeMutation.mutate} />
          <GalleryCell image={slots[2]} editable={editable} onRemove={removeMutation.mutate} />
        </div>

        <div className="hidden flex-col gap-2 sm:flex">
          <GalleryCell image={slots[3]} tall editable={editable} onRemove={removeMutation.mutate} />
          {editable && (
            <>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (file) addMutation.mutate(file)
                  e.target.value = ""
                }}
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="w-full"
                disabled={addMutation.isPending}
                onClick={() => inputRef.current?.click()}
              >
                <ImagePlus className="size-4" />
                {addMutation.isPending ? "Uploading…" : "Add Image"}
              </Button>
            </>
          )}
        </div>
      </div>

      {editable && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground sm:hidden">
          <ImagePlus className="size-3.5" />
          Add photos from a wider screen for now.
        </div>
      )}
    </div>
  )
}

function GalleryCell({
  image,
  large,
  tall,
  editable,
  onRemove,
}: {
  image?: IPropertyImage
  large?: boolean
  tall?: boolean
  editable: boolean
  onRemove: (publicId: string) => void
}) {
  return (
    <div className={`group relative overflow-hidden rounded-lg bg-muted ${large ? "h-full" : tall ? "h-[calc(100%-40px)]" : ""}`}>
      {image?.url ? (
        <>
          <Image
            src={image.url}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 470px"
            className="object-cover"
          />
          {editable && image.publicId && (
            <button
              type="button"
              onClick={() => onRemove(image.publicId)}
              className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove image"
            >
              <X className="size-3.5" />
            </button>
          )}
        </>
      ) : (
        <div className="flex size-full items-center justify-center text-muted-foreground">
          <Building2 className="size-6" />
        </div>
      )}
    </div>
  )
}
