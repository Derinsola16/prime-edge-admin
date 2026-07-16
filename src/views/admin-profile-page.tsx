"use client"

import Image from "next/image"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getSessionUser } from "@/services/api/user"
import { updateUserProfile } from "@/services/api/profile"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ProfileFormValues = {
  first_name: string
  last_name: string
  email: string
  phone: string
  country: string
  city: string
  gender: string
  employment_status: string
  marital_status: string
  date_of_birth: string
  home_address: string
  occupation: string
}

export default function AdminProfilePage() {
  const { data } = useQuery({ queryKey: ["session-user"], queryFn: getSessionUser })
  const user = data?.data

  const { register, handleSubmit } = useForm<ProfileFormValues>({
    values: user
      ? {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: "",
          country: "",
          city: "",
          gender: "",
          employment_status: "",
          marital_status: "",
          date_of_birth: "",
          home_address: "",
          occupation: "",
        }
      : undefined,
  })

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => toast.success("Profile updated"),
    onError: () => toast.error("Failed to update profile"),
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Admin Profile
        </h1>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full">
            Calculate Yield
          </Button>
          <Button className="rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover">
            Discover Properties
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative h-28 w-full">
          <Image
            src="/assets/images/properties/property-1.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="flex items-center gap-3 p-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-orange-400 text-sm font-semibold text-white">
            {(user?.first_name?.[0] ?? "H") + (user?.last_name?.[0] ?? "4")}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {user ? `${user.first_name} ${user.last_name}` : "Hannah 4President"}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(values => mutation.mutate(values))}
        className="max-w-3xl space-y-4 rounded-xl border border-border bg-card p-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="First name" {...register("first_name")} />
          <Field label="Last name" {...register("last_name")} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Email" type="email" {...register("email")} />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Phone</label>
            <div className="flex gap-2">
              <Select defaultValue="+234">
                <SelectTrigger className="h-11 w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+234">+234</SelectItem>
                  <SelectItem value="+1">+1</SelectItem>
                  <SelectItem value="+44">+44</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="1234 1234 1234"
                className="h-11 flex-1"
                {...register("phone")}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Country" {...register("country")} />
          <Field label="City" {...register("city")} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Gender" {...register("gender")} />
          <Field label="Employment Status" {...register("employment_status")} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Marital Status" {...register("marital_status")} />
          <Field label="Date of Birth" type="date" {...register("date_of_birth")} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Home Address" {...register("home_address")} />
          <Field label="Occupation" {...register("occupation")} />
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="h-11 w-full rounded-full bg-brand-skyblue text-white hover:bg-brand-skyblue-hover"
        >
          {mutation.isPending ? "Saving…" : "Submit"}
        </Button>
      </form>
    </div>
  )
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Input placeholder="Name" className="h-11" {...props} />
    </div>
  )
}
