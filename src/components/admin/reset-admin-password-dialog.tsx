"use client"

import { z } from "zod"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { resetAdminPassword } from "@/services/api/admin"
import { ApiErrorResponse } from "@/types/api.types"
import { IAdminUser } from "@/types/admin.types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export function ResetAdminPasswordDialog({
  admin,
  open,
  onOpenChange,
}: {
  admin: IAdminUser | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const queryClient = useQueryClient()

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "" },
  })

  const mutation = useMutation({
    mutationFn: (values: ResetPasswordFormValues) => {
      if (!admin) throw new Error("No admin selected")
      return resetAdminPassword(admin.id, values.newPassword)
    },
    onSuccess: () => {
      toast.success("Password reset")
      queryClient.invalidateQueries({ queryKey: ["admins"] })
      onOpenChange(false)
      form.reset()
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to reset password")
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            {admin ? `Set a new password for ${admin.firstName} ${admin.lastName}.` : ""}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(values => mutation.mutate(values))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
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
                {mutation.isPending ? "Resetting…" : "Reset Password"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
