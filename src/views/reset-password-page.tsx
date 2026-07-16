"use client"

import { z } from "zod"
import { toast } from "sonner"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"

import { resetPassword } from "@/services/api/auth"
import { ApiErrorResponse } from "@/types/api.types"
import ResetPasswordForm from "@/components/auth/reset-password-form"
import { ResetPasswordSuccessDialog } from "@/components/auth/reset-password-success-dialog"

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Please re-enter your password"),
  })
  .refine(values => values.password === values.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") ?? ""
  const [success, setSuccess] = useState(false)

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirm_password: "" },
  })

  const mutation = useMutation({
    mutationFn: (values: ResetPasswordFormValues) =>
      resetPassword({ token, password: values.password }),
    onSuccess: () => setSuccess(true),
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to reset password")
    },
  })

  return (
    <>
      <ResetPasswordForm
        form={form}
        isPending={mutation.isPending}
        onSubmit={values => mutation.mutate(values)}
      />
      <ResetPasswordSuccessDialog open={success} />
    </>
  )
}
