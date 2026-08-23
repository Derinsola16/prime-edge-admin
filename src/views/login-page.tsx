"use client"

import { z } from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { login } from "@/services/api/auth"
import LoginForm from "@/components/auth/login-form"
import { ApiErrorResponse } from "@/types/api.types"
import { LoginRequest } from "@/types/auth.types"

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z.string().min(1, "Password is required"),
  agreeToTerms: z.literal(true, {
    message: "You must agree to the terms to continue",
  }),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      agreeToTerms: false as unknown as true,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const metadata = error.response?.data?.metadata
      const errorMessage = error.response?.data?.message || "An error occurred!"

      if (metadata && Object.keys(metadata).length > 0) {
        Object.entries(metadata).forEach(([field, message]) => {
          if (message) {
            form.setError(field as keyof LoginFormValues, { message })
          }
        })
      } else {
        toast.error(errorMessage)
      }
    },
    onSuccess: async () => {
      toast.success("Login success!")

      form.reset()
      await queryClient.invalidateQueries({ queryKey: ["session-user"] })

      const params = new URLSearchParams(window.location.search)
      const redirectUrl = params.get("redirect") || "/dashboard"

      router.push(redirectUrl)
    },
  })

  const handleLogin = (values: LoginFormValues) => {
    mutation.mutate({ email: values.email, password: values.password })
  }

  return <LoginForm form={form} mutation={mutation} onSubmit={handleLogin} />
}
