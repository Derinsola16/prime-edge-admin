"use client"

import { z } from "zod"
import { toast } from "sonner"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"
import { Loader2, Pencil } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getSessionUser } from "@/services/api/user"
import { ApiErrorResponse } from "@/types/api.types"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  changePassword,
  updateProfile,
  uploadAvatar,
  type ChangePasswordPayload,
  type UpdateProfilePayload,
} from "@/services/api/profile"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine(values => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type PasswordFormValues = z.infer<typeof passwordSchema>

export default function AdminProfilePage() {
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data } = useQuery({ queryKey: ["session-user"], queryFn: getSessionUser })
  const user = data?.data

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: user
      ? {
          firstName: user.first_name,
          lastName: user.last_name,
          phone: user.phone ?? "",
        }
      : undefined,
  })

  const profileMutation = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: () => {
      toast.success("Profile updated")
      queryClient.invalidateQueries({ queryKey: ["session-user"] })
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to update profile")
    },
  })

  const avatarMutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      toast.success("Avatar updated")
      queryClient.invalidateQueries({ queryKey: ["session-user"] })
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to upload avatar")
    },
  })

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  })

  const passwordMutation = useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onSuccess: () => {
      toast.success("Password changed")
      passwordForm.reset()
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to change password")
    },
  })

  const handleAvatarClick = () => fileInputRef.current?.click()

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) avatarMutation.mutate(file)
    e.target.value = ""
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-semibold text-foreground">
        Admin Profile
      </h1>

      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
        <button
          type="button"
          onClick={handleAvatarClick}
          className="group relative"
          aria-label="Change avatar"
        >
          <Avatar size="lg">
            <AvatarImage src={user?.avatar_url} alt="" />
            <AvatarFallback>
              {(user?.first_name?.[0] ?? "") + (user?.last_name?.[0] ?? "")}
            </AvatarFallback>
          </Avatar>
          <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-brand-deepblue text-white">
            {avatarMutation.isPending ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <Pencil className="size-3" />
            )}
          </span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
        <div>
          <p className="text-sm font-semibold text-foreground">
            {user ? `${user.first_name} ${user.last_name}` : ""}
          </p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(values => profileMutation.mutate(values))}
          className="max-w-3xl space-y-4 rounded-xl border border-border bg-card p-6"
        >
          <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={profileForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input className="h-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input className="h-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input className="h-11" value={user?.email ?? ""} disabled />
            </div>
            <FormField
              control={profileForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input className="h-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={profileMutation.isPending}
            className="h-11 w-full rounded-full bg-brand-skyblue text-white hover:bg-brand-skyblue-hover"
          >
            {profileMutation.isPending ? "Saving…" : "Save Changes"}
          </Button>
        </form>
      </Form>

      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(values => passwordMutation.mutate(values))}
          className="max-w-3xl space-y-4 rounded-xl border border-border bg-card p-6"
        >
          <h2 className="text-lg font-semibold text-foreground">Change Password</h2>

          <FormField
            control={passwordForm.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current password</FormLabel>
                <FormControl>
                  <Input type="password" className="h-11" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" className="h-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input type="password" className="h-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={passwordMutation.isPending}
            className="h-11 w-full rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
          >
            {passwordMutation.isPending ? "Updating…" : "Change Password"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
