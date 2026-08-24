import { ProductStatus } from "@/types/property.types"

export function getPropertyStatusLabel(status: ProductStatus) {
  switch (status) {
    case "available":
      return "Available"
    case "reserved":
      return "Reserved"
    case "sold":
      return "Sold"
    case "off_plan":
      return "Off-Plan"
  }
}

export function getPropertyStatusClassName(status: ProductStatus) {
  switch (status) {
    case "available":
      return "border-transparent bg-success/10 text-success"
    case "reserved":
      return "border-orange-400 text-orange-500 bg-transparent"
    case "sold":
      return "border-transparent bg-muted text-muted-foreground"
    case "off_plan":
      return "border-brand-skyblue text-brand-deepblue bg-transparent"
  }
}

export function formatNaira(value?: number) {
  if (value === undefined || value === null) return "—"
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`
  return `₦${value.toLocaleString()}`
}

export function formatPropertyType(type: string) {
  return type
    .split("_")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}
