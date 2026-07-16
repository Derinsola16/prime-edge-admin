"use client"

import Link from "next/link"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { buttonVariants } from "@/components/ui/button"
import { getCmsProjects } from "@/services/api/cms"
import { CmsProjectCard } from "@/components/cms/cms-project-card"

const filters = [
  { label: "All", value: "all" },
  { label: "In construction", value: "construction" },
  { label: "Completed", value: "completed" },
  { label: "Drafts", value: "draft" },
] as const

export default function CmsProjectsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("all")

  const { data } = useQuery({ queryKey: ["cms-projects"], queryFn: getCmsProjects })
  const projects = (data?.data.items ?? []).filter(
    p => filter === "all" || p.status === filter
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Website CMS - Projects
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

      <div className="flex flex-col gap-6">
        {projects.map(project => (
          <CmsProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
