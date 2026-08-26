"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { buttonVariants } from "@/components/ui/button"
import { CmsMetrics } from "@/components/cms/cms-metrics"
import { getCmsMetrics, getCmsProjects } from "@/services/api/cms"
import { ContactInfoForm } from "@/components/cms/contact-info-form"
import { TestimonialSubmitForm } from "@/components/cms/testimonial-submit-form"
import { CmsProjectPreviewRow } from "@/components/cms/cms-project-preview-row"

export default function CmsOverviewPage() {
  const { data: metricsRes } = useQuery({
    queryKey: ["cms-metrics"],
    queryFn: getCmsMetrics,
  })

  const { data: projectsRes } = useQuery({
    queryKey: ["cms-projects"],
    queryFn: getCmsProjects,
  })

  const projects = projectsRes?.data.items.slice(0, 3) ?? []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Website CMS - Overview
        </h1>
        <Link
          href="/cms/projects/add"
          className={buttonVariants({
            className: "rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover",
          })}
        >
          Add Projects
        </Link>
      </div>

      {metricsRes && <CmsMetrics metrics={metricsRes.data} />}

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Projects</h2>
          <Link href="/cms/projects" className="text-sm font-medium text-brand-skyblue">
            See all
          </Link>
        </div>

        <div>
          {projects.map(project => (
            <CmsProjectPreviewRow key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Manage Contacts</h2>
          <ContactInfoForm />
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Testimonials</h2>
          <TestimonialSubmitForm />
        </div>
      </div>
    </div>
  )
}
