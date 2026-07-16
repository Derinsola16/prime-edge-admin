"use client"

import { toast } from "sonner"
import { Phone, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ContactInfo } from "@/types/cms.types"
import { getContactInfo, updateContactInfo } from "@/services/api/cms"

export function ContactInfoForm() {
  const queryClient = useQueryClient()
  const { data } = useQuery({ queryKey: ["cms-contact-info"], queryFn: getContactInfo })

  const { register, handleSubmit, reset } = useForm<ContactInfo>({
    values: data?.data,
  })

  const mutation = useMutation({
    mutationFn: updateContactInfo,
    onSuccess: res => {
      toast.success("Contact information updated")
      queryClient.setQueryData(["cms-contact-info"], { message: "ok", data: res.data })
      reset(res.data)
    },
    onError: () => toast.error("Failed to update contact information"),
  })

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Update global footer and contact details.
      </p>

      <form
        onSubmit={handleSubmit(values => mutation.mutate(values))}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <div className="relative">
            <Phone className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-11 pl-9" {...register("phone_number")} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Whatsapp Number</label>
          <div className="relative">
            <Phone className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-11 pl-9" {...register("whatsapp_number")} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Support Email</label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-11 pl-9" {...register("support_email")} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Company Email</label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-11 pl-9" {...register("company_email")} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Address</label>
          <Textarea rows={3} {...register("address")} />
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="h-11 w-full rounded-full bg-brand-skyblue text-white hover:bg-brand-skyblue-hover"
        >
          {mutation.isPending ? "Updating…" : "Update"}
        </Button>
      </form>
    </div>
  )
}
