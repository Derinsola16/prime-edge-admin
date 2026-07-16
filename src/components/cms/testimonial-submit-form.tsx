"use client"

import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getCmsProjects, submitTestimonial } from "@/services/api/cms"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FormValues = {
  full_name: string
  occupation: string
  project_id: string
  testimony: string
}

export function TestimonialSubmitForm() {
  const queryClient = useQueryClient()
  const { data: projectsRes } = useQuery({
    queryKey: ["cms-projects-lite"],
    queryFn: getCmsProjects,
  })

  const { register, handleSubmit, watch, setValue, reset } = useForm<FormValues>({
    defaultValues: { full_name: "", occupation: "", project_id: "", testimony: "" },
  })

  const mutation = useMutation({
    mutationFn: submitTestimonial,
    onSuccess: () => {
      toast.success("Testimonial request shared")
      queryClient.invalidateQueries({ queryKey: ["cms-testimonials"] })
      reset()
    },
    onError: () => toast.error("Failed to share testimonial request"),
  })

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground">Client&apos;s Testimonial Form</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Share with Clients to get their testimonies
      </p>

      <form
        onSubmit={handleSubmit(values => mutation.mutate(values))}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <Input placeholder="Name" className="h-11" {...register("full_name")} />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Occupation</label>
          <Input placeholder="Name" className="h-11" {...register("occupation")} />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Project</label>
          <Select
            value={watch("project_id")}
            onValueChange={value => setValue("project_id", value ?? "")}
          >
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="E.g Ivie Towers" />
            </SelectTrigger>
            <SelectContent>
              {projectsRes?.data.items.map(project => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Testimony</label>
          <Textarea rows={4} {...register("testimony")} />
        </div>

        <Button
          type="submit"
          variant="outline"
          disabled={mutation.isPending}
          className="h-11 w-full rounded-full border-brand-skyblue text-brand-skyblue hover:bg-brand-skyblue-ghost"
        >
          {mutation.isPending ? "Sharing…" : "Share"}
        </Button>
      </form>
    </div>
  )
}
