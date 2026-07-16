import { IPropertyDetail } from "@/types/property.types"
import { AddPropertyFormValues } from "@/types/add-property.types"

const FALLBACK_IMAGES = [
  "/assets/images/properties/property-1.png",
  "/assets/images/properties/property-2.png",
  "/assets/images/properties/property-1.png",
  "/assets/images/properties/property-2.png",
]

// Fields not collected by the wizard (risk rating, documents, growth history, etc.)
// fall back to reasonable placeholders until those steps/endpoints exist.
export function buildPreviewFromWizard(
  values: AddPropertyFormValues
): IPropertyDetail {
  return {
    id: "preview",
    name: values.property_name || "Untitled Property",
    estate_name: values.project_type || "",
    address: values.full_address || values.location || "",
    images: FALLBACK_IMAGES,
    location_label: values.location || "—",
    location_note: values.full_address || "",
    duration_label: values.duration || "—",
    duration_note: "From statutory building approval.",
    bedrooms: Number(values.bedrooms) || 0,
    has_bq: true,
    projected_irr: Number(values.projected_irr.replace(/[^\d.]/g, "")) || 0,
    property_type:
      values.category === "residential"
        ? "Residential Luxury"
        : values.category === "commercial"
          ? "Commercial"
          : "Mixed Use",
    developer: "Prime Edge",
    tenure: "Freehold",
    completion_label: "TBD",
    description: values.description || "No description provided yet.",
    target_irr: Number(values.finance_projected_irr.replace(/[^\d.]/g, "")) || 0,
    exp_cash_yield: Number(values.exp_cash_yield.replace(/[^\d.]/g, "")) || 0,
    min_investment: Number(values.min_investment.replace(/[^\d.]/g, "")) || 0,
    funding_raised: 0,
    funding_target: Number(values.property_price.replace(/[^\d.]/g, "")) || 0,
    funding_percent: 0,
    days_left: 0,
    units_available: Number(values.units) || 0,
    units_bought: 0,
    risk_rating: "A",
    documents: [
      { id: "d1", label: "Deed of Assignment", format: "PDF", size_label: "15 MB", url: "#" },
      { id: "d2", label: "Investment Contract", format: "PDF", size_label: "15 MB", url: "#" },
      { id: "d3", label: "Building floor Plans", format: "PDF", size_label: "15 MB", url: "#" },
    ],
    floor_plan_url: FALLBACK_IMAGES[0],
    amenities: values.amenities.map((label, i) => ({
      id: `amenity-${i}`,
      label,
      icon: "shield-check",
    })),
    growth: [
      { month: "Sep", revenue: 0, projected: 0 },
      { month: "Oct", revenue: 0, projected: 0 },
      { month: "Nov", revenue: 0, projected: 0 },
      { month: "Dec", revenue: 0, projected: 0 },
    ],
    overall_revenue_label: "$0",
    current_valuation: Number(values.property_price.replace(/[^\d.]/g, "")) || 0,
    share_price: 0,
    hold_period: "Forever",
    min_investment_amount: Number(values.min_investment.replace(/[^\d.]/g, "")) || 0,
  }
}
