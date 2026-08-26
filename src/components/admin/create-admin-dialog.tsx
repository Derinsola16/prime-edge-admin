"use client"

import { z } from "zod"
import { toast } from "sonner"
import { useState } from "react"
import { AxiosError } from "axios"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { createAdmin } from "@/services/api/admin"
import { ApiErrorResponse } from "@/types/api.types"
import { ROLE_OPTIONS, PERMISSION_OPTIONS } from "@/types/admin.types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

const createAdminSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["admin", "editor", "viewer"], { message: "Role is required" }),
  permissions: z.array(
    z.enum([
      "manage_content",
      "manage_projects",
      "manage_products",
      "manage_users",
      "manage_inquiries",
      "view_analytics",
    ])
  ),
})

type CreateAdminFormValues = z.infer<typeof createAdminSchema>

export function CreateAdminDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const queryClient = useQueryClient()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<CreateAdminFormValues>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "viewer",
      permissions: [],
    },
  })

  const mutation = useMutation({
    mutationFn: (values: CreateAdminFormValues) => createAdmin(values),
    onSuccess: () => {
      toast.success("Admin created")
      queryClient.invalidateQueries({ queryKey: ["admins"] })
      queryClient.invalidateQueries({ queryKey: ["admin-metrics"] })
      onOpenChange(false)
      form.reset()
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to create admin")
    },
  })

  const permissions = form.watch("permissions")

  const togglePermission = (value: CreateAdminFormValues["permissions"][number]) => {
    const next = permissions.includes(value)
      ? permissions.filter(p => p !== value)
      : [...permissions, value]
    form.setValue("permissions", next)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] sm:max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
          <DialogDescription>
            Create an account for a new member of your admin team.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(values => mutation.mutate(values))}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
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
                control={form.control}
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

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="h-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="h-11 pr-10"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(s => !s)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ROLE_OPTIONS.map(role => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Permissions</label>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg border border-border p-4">
                {PERMISSION_OPTIONS.map(permission => (
                  <label
                    key={permission.value}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <Checkbox
                      checked={permissions.includes(permission.value)}
                      onCheckedChange={() => togglePermission(permission.value)}
                    />
                    {permission.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
              >
                {mutation.isPending ? "Creating…" : "Create Admin"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
