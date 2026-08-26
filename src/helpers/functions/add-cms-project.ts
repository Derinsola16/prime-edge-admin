import { AddCmsProjectFormValues } from "@/types/add-cms-project.types"
import { CreateCmsProjectPayload } from "@/services/api/cms"

export function buildCreateCmsProjectPayload(
  values: AddCmsProjectFormValues,
  isPublished: boolean
): CreateCmsProjectPayload {
  return {
    title: values.project_name.trim() || "Untitled project",
    description:
      values.about_project.trim() || values.overview.trim() || "Draft project — details pending.",
    shortDescription: values.overview.trim() || undefined,
    status: values.status,
    type: values.category,
    location: { address: (values.full_address || values.map_address).trim() || "Address pending" },
    constructionProgress: values.construction_progress ? Number(values.construction_progress) : undefined,
    isPublished,
    tagline: values.tagline.trim() || undefined,
    estimatedDelivery: values.estimated_delivery.trim() || undefined,
    locationLabel: values.location.trim() || undefined,
    heading: values.heading.trim() || undefined,
    valueTagline: values.value_tagline.trim() || undefined,
    subtext: values.subtext.trim() || undefined,
    bulletPoints: values.bullet_points.trim() || undefined,
    amenitiesDescription: values.amenities_description.trim() || undefined,
    mapAddress: values.map_address.trim() || undefined,
    locationDescription: values.location_description.trim() || undefined,
  }
}
