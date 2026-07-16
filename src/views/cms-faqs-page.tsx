"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getCmsProjects, getFaqs, createFaq } from "@/services/api/cms"
import { BoxedRadioOption } from "@/components/properties/add-property/boxed-option"

type FormValues = { question: string; answer: string; project_id: string }

export default function CmsFaqsPage() {
  const queryClient = useQueryClient()
  const [projectFilter, setProjectFilter] = useState("all")

  const { data: projectsRes } = useQuery({
    queryKey: ["cms-projects"],
    queryFn: getCmsProjects,
  })
  const { data: faqsRes } = useQuery({ queryKey: ["cms-faqs"], queryFn: getFaqs })

  const { register, handleSubmit, watch, setValue, reset } = useForm<FormValues>({
    defaultValues: { question: "", answer: "", project_id: "" },
  })

  const mutation = useMutation({
    mutationFn: createFaq,
    onSuccess: () => {
      toast.success("FAQ added")
      queryClient.invalidateQueries({ queryKey: ["cms-faqs"] })
      reset()
    },
    onError: () => toast.error("Failed to add FAQ"),
  })

  const faqs = faqsRes?.data.items ?? []
  const projects = projectsRes?.data.items ?? []

  const filteredFaqs =
    projectFilter === "all" ? faqs : faqs.filter(f => f.project_id === projectFilter)

  const grouped = filteredFaqs.reduce<Record<string, typeof faqs>>((acc, faq) => {
    acc[faq.category] = acc[faq.category] ?? []
    acc[faq.category].push(faq)
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-semibold text-foreground">
        Website CMS - FAQs
      </h1>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground">Frequently Asked Question</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Add a Question and it&apos;s answer, then Click &quot;Add&quot; to save
        </p>

        <form
          onSubmit={handleSubmit(values => mutation.mutate(values))}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Question</label>
            <Input placeholder="Name" className="h-11" {...register("question")} />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Answer</label>
            <Textarea rows={3} {...register("answer")} />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Project</label>
            <div className="flex flex-wrap gap-3">
              {projects.map(project => (
                <BoxedRadioOption
                  key={project.id}
                  label={project.name}
                  checked={watch("project_id") === project.id}
                  onSelect={() => setValue("project_id", project.id)}
                />
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-11 w-full rounded-full bg-brand-skyblue text-white hover:bg-brand-skyblue-hover"
          >
            {mutation.isPending ? "Adding…" : "Add"}
          </Button>
        </form>
      </div>

      <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1 w-fit">
        <button
          onClick={() => setProjectFilter("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            projectFilter === "all" ? "bg-muted text-foreground" : "text-muted-foreground"
          }`}
        >
          All
        </button>
        {projects.map(project => (
          <button
            key={project.id}
            onClick={() => setProjectFilter(project.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              projectFilter === project.id
                ? "bg-muted text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {project.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-6 last:mb-0">
            <p className="mb-3 text-xs font-semibold tracking-wide text-brand-deepblue uppercase">
              {category}
            </p>

            <div className="space-y-4">
              {items.map(faq => (
                <div key={faq.id}>
                  <p className="text-sm font-semibold text-brand-deepblue">{faq.question}</p>
                  <p className="mt-1 rounded-lg border-l-2 border-brand-skyblue bg-secondary/60 p-3 text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
