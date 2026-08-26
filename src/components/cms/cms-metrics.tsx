import { Building2, Home, Landmark, HelpCircle, MessageSquareQuote, Phone } from "lucide-react"

import { ICmsMetrics } from "@/types/cms.types"

export function CmsMetrics({ metrics }: { metrics: ICmsMetrics }) {
  const items = [
    { label: "Total Projects", value: metrics.total_projects, icon: Building2 },
    { label: "Completed Projects", value: metrics.completed_projects, icon: Home },
    { label: "Ongoing Projects", value: metrics.ongoing_projects, icon: Landmark },
    { label: "FAQs", value: metrics.faqs, icon: HelpCircle },
    { label: "Testimonials", value: metrics.testimonials, icon: MessageSquareQuote },
    { label: "Contact Info", value: metrics.contact_info, icon: Phone },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {items.map(item => (
        <div
          key={item.label}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-5"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
            <item.icon className="size-5" />
          </span>
          <span>
            <span className="block text-sm text-muted-foreground">{item.label}</span>
            <span className="block text-2xl font-semibold text-foreground">
              {item.value}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}
