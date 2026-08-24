import { AddPropertyFormValues, PAYMENT_PLAN_OPTIONS } from "@/types/add-property.types"
import { IPropertyDetail, IPropertyPaymentPlan } from "@/types/property.types"
import { CreatePropertyPayload, IProjectOption } from "@/services/api/properties"

export function paymentPlansFromSelection(
  selected: AddPropertyFormValues["paymentPlans"]
): IPropertyPaymentPlan[] {
  return PAYMENT_PLAN_OPTIONS.filter(o => selected.includes(o.value)).map(o => ({
    name: o.name,
    duration: o.duration,
  }))
}

export function buildCreatePropertyPayload(values: AddPropertyFormValues): CreatePropertyPayload {
  return {
    title: values.title.trim(),
    type: values.type as CreatePropertyPayload["type"],
    description: values.description.trim() || undefined,
    price: Number(values.price.replace(/[^\d.]/g, "")) || 0,
    priceLabel: values.priceLabel.trim() || undefined,
    size: values.size ? Number(values.size) : undefined,
    bedrooms: values.bedrooms ? Number(values.bedrooms) : undefined,
    bathrooms: values.bathrooms ? Number(values.bathrooms) : undefined,
    toilets: values.toilets ? Number(values.toilets) : undefined,
    parkingSpaces: values.parkingSpaces ? Number(values.parkingSpaces) : undefined,
    floor: values.floor ? Number(values.floor) : undefined,
    totalFloors: values.totalFloors ? Number(values.totalFloors) : undefined,
    serviceCharge: values.serviceCharge ? Number(values.serviceCharge.replace(/[^\d.]/g, "")) : undefined,
    paymentPlans: paymentPlansFromSelection(values.paymentPlans),
    features: values.features,
    virtualTourUrl: values.virtualTourUrl.trim() || undefined,
    isFeatured: values.isFeatured,
    isPublished: values.publishNow,
    status: values.status,
  }
}

/** Builds a read-only preview object for the Review & Publish step, using local (not-yet-uploaded) image URLs. */
export function buildPropertyPreview(
  values: AddPropertyFormValues,
  project: IProjectOption | undefined,
  imagePreviewUrls: string[],
  floorPlanPreviewUrl: string | null
): IPropertyDetail {
  return {
    id: "preview",
    name: values.title || "Untitled Property",
    slug: "",
    description: values.description,
    project: project
      ? { id: project.id, title: project.title, status: project.status, location: project.location }
      : null,
    address: project ? `${project.location.address}, ${project.location.city}, ${project.location.state}` : "—",
    images: imagePreviewUrls.map((url, i) => ({ id: String(i), url, publicId: "" })),
    type: (values.type || "apartment") as IPropertyDetail["type"],
    status: values.status,
    size: values.size ? Number(values.size) : undefined,
    bedrooms: values.bedrooms ? Number(values.bedrooms) : undefined,
    bathrooms: values.bathrooms ? Number(values.bathrooms) : undefined,
    toilets: values.toilets ? Number(values.toilets) : undefined,
    parkingSpaces: values.parkingSpaces ? Number(values.parkingSpaces) : undefined,
    floor: values.floor ? Number(values.floor) : undefined,
    totalFloors: values.totalFloors ? Number(values.totalFloors) : undefined,
    price: Number(values.price.replace(/[^\d.]/g, "")) || 0,
    priceLabel: values.priceLabel || undefined,
    serviceCharge: values.serviceCharge ? Number(values.serviceCharge.replace(/[^\d.]/g, "")) : undefined,
    paymentPlans: paymentPlansFromSelection(values.paymentPlans),
    features: values.features,
    floorPlan: floorPlanPreviewUrl ? { url: floorPlanPreviewUrl, publicId: "" } : undefined,
    virtualTourUrl: values.virtualTourUrl || undefined,
    isFeatured: values.isFeatured,
    isPublished: values.publishNow,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}
