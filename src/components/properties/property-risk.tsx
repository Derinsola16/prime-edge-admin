import {
  ShieldCheck,
  StickyNote,
  Scale,
  UserRoundCog,
  ChartNoAxesCombined,
  Download,
} from "lucide-react"

import { IPropertyDetail } from "@/types/property.types"
import { SectionCard } from "@/components/properties/section-card"

const documentIcons = [StickyNote, Scale, UserRoundCog, ChartNoAxesCombined]

export function PropertyRisk({ property }: { property: IPropertyDetail }) {
  return (
    <SectionCard icon={ShieldCheck} title="Risk & Due Diligence">
      <div className="flex gap-6">
        <div className="flex w-[136px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-border py-8">
          <span className="flex size-12 items-center justify-center rounded-full border-2 border-success text-xl font-semibold text-success">
            {property.risk_rating}
          </span>
          <span className="text-sm font-medium text-foreground">Low Risk</span>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-6">
          {property.documents.map((doc, i) => {
            const Icon = documentIcons[i % documentIcons.length]

            return (
              <a
                key={doc.id}
                href={doc.url}
                className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
                  <Icon className="size-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {doc.label}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {doc.format} • {doc.size_label}
                  </span>
                </span>
                <Download className="size-4 shrink-0 text-muted-foreground" />
              </a>
            )
          })}
        </div>
      </div>
    </SectionCard>
  )
}
