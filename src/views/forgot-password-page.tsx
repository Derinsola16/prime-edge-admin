"use client"

import { z } from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"

import { ApiErrorResponse } from "@/types/api.types"
import { sendPasswordResetEmail } from "@/services/api/auth"
import ForgotPasswordForm from "@/components/auth/forgot-password-form"

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  const mutation = useMutation({
    mutationFn: (values: ForgotPasswordFormValues) => sendPasswordResetEmail(values),
    onSuccess: () => {
      toast.success("If that email exists, a reset link has been sent.")
      form.reset()
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to send reset link")
    },
  })

  return (
    <ForgotPasswordForm
      form={form}
      isPending={mutation.isPending}
      onSubmit={values => mutation.mutate(values)}
    />
  )
}
