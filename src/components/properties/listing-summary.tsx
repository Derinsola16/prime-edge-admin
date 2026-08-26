"use client"

import { toast } from "sonner"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { Trash2, Star, Eye, EyeOff } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ApiErrorResponse } from "@/types/api.types"
import { IPropertyDetail } from "@/types/property.types"
import { formatNaira, getPropertyStatusLabel } from "@/helpers/functions/property"
import { deleteProperty, togglePropertyFeatured, togglePropertyPublish } from "@/services/api/properties"

export function ListingSummary({ property }: { property: IPropertyDetail }) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const publishMutation = useMutation({
    mutationFn: () => togglePropertyPublish(property.id),
    onSuccess: res => {
      toast.success(res.data.isPublished ? "Property published" : "Property unpublished")
      queryClient.invalidateQueries({ queryKey: ["property", property.id] })
      queryClient.invalidateQueries({ queryKey: ["properties"] })
      queryClient.invalidateQueries({ queryKey: ["property-metrics"] })
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to update publish state")
    },
  })

  const featuredMutation = useMutation({
    mutationFn: () => togglePropertyFeatured(property.id),
    onSuccess: res => {
      toast.success(res.data.isFeatured ? "Marked as featured" : "Removed from featured")
      queryClient.invalidateQueries({ queryKey: ["property", property.id] })
      queryClient.invalidateQueries({ queryKey: ["properties"] })
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to update featured state")
    },
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteProperty(property.id),
    onSuccess: () => {
      toast.success("Property deleted")
      queryClient.invalidateQueries({ queryKey: ["properties"] })
      queryClient.invalidateQueries({ queryKey: ["property-metrics"] })
      router.push("/properties")
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to delete property")
    },
  })

  return (
    <div className="lg:sticky lg:top-8 rounded-xl border border-border bg-card p-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Listing Summary</h3>
        <p className="text-sm text-muted-foreground">Manage this property&apos;s visibility.</p>
      </div>

      <div className="mb-6 space-y-1 rounded-lg bg-secondary p-4">
        <p className="text-sm text-muted-foreground">Price</p>
        <p className="text-2xl font-semibold text-foreground">
          {property.priceLabel || formatNaira(property.price)}
        </p>
        <p className="text-sm text-muted-foreground">{getPropertyStatusLabel(property.status)}</p>
      </div>

      <div className="mb-4 flex items-center justify-between rounded-lg border border-border p-4">
        <div className="flex items-center gap-2">
          {property.isPublished ? (
            <Eye className="size-4 text-success" />
          ) : (
            <EyeOff className="size-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium text-foreground">
            {property.isPublished ? "Published" : "Draft"}
          </span>
        </div>
        <Switch
          checked={property.isPublished}
          disabled={publishMutation.isPending}
          onCheckedChange={() => publishMutation.mutate()}
        />
      </div>

      <div className="mb-6 flex items-center justify-between rounded-lg border border-border p-4">
        <div className="flex items-center gap-2">
          <Star className={cn("size-4", property.isFeatured ? "fill-amber-400 text-amber-400" : "text-muted-foreground")} />
          <span className="text-sm font-medium text-foreground">Featured</span>
        </div>
        <Switch
          checked={property.isFeatured}
          disabled={featuredMutation.isPending}
          onCheckedChange={() => featuredMutation.mutate()}
        />
      </div>

      <Button
        variant="outline"
        className="w-full rounded-full border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
        disabled={deleteMutation.isPending}
        onClick={() => {
          if (confirm(`Delete "${property.name}"? This cannot be undone.`)) {
            deleteMutation.mutate()
          }
        }}
      >
        <Trash2 className="size-4" />
        {deleteMutation.isPending ? "Deleting…" : "Delete Property"}
      </Button>
    </div>
  )
}
