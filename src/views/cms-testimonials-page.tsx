"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { getTestimonials, updateTestimonialStatus } from "@/services/api/cms"
import { TestimonialCard } from "@/components/cms/testimonial-card"
import { TestimonialStatus } from "@/types/cms.types"

const filters: { label: string; value: "all" | TestimonialStatus }[] = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "New", value: "new" },
]

export default function CmsTestimonialsPage() {
  const [filter, setFilter] = useState<"all" | TestimonialStatus>("all")
  const queryClient = useQueryClient()

  const { data } = useQuery({ queryKey: ["cms-testimonials"], queryFn: getTestimonials })

  const mutation = useMutation({
    mutationFn: updateTestimonialStatus,
    onSuccess: () => {
      toast.success("Testimonial updated")
      queryClient.invalidateQueries({ queryKey: ["cms-testimonials"] })
    },
  })

  const testimonials = (data?.data.items ?? []).filter(
    t => filter === "all" || t.status === filter
  )

  const grouped = testimonials.reduce<Record<string, typeof testimonials>>((acc, t) => {
    acc[t.project_name] = acc[t.project_name] ?? []
    acc[t.project_name].push(t)
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-semibold text-foreground">
        Website CMS - Testimonials
      </h1>

      <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1 w-fit">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f.value ? "bg-muted text-foreground" : "text-muted-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {Object.entries(grouped).map(([projectName, items]) => (
        <div key={projectName}>
          <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {projectName}
          </p>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">Client Testimonials</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Only approved statements will be visible on the website
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map(testimonial => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  onApprove={() =>
                    mutation.mutate({ id: testimonial.id, status: "approved" })
                  }
                  onReject={() =>
                    mutation.mutate({ id: testimonial.id, status: "rejected" })
                  }
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
