import { IProperty } from "@/types/property.types"

export function getPropertyStatusLabel(property: IProperty) {
  if (property.status === "construction") {
    return `Construction: ${property.construction_progress ?? 0}%`
  }

  return property.status.charAt(0).toUpperCase() + property.status.slice(1)
}

export function getPropertyStatusClassName(property: IProperty) {
  switch (property.status) {
    case "operational":
      return "border-transparent bg-success/10 text-success"
    case "construction":
      return (property.construction_progress ?? 0) >= 50
        ? "border-brand-skyblue text-brand-deepblue bg-transparent"
        : "border-orange-400 text-orange-500 bg-transparent"
    case "completed":
    case "delivered":
      return "border-orange-400 text-orange-500 bg-transparent"
    default:
      return "border-border text-muted-foreground bg-transparent"
  }
}
