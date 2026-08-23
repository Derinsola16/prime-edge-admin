"use client"

import { useState } from "react"
import { AxiosError } from "axios"
import { UseMutationResult } from "@tanstack/react-query"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { LoginFormValues } from "@/views/login-page"
import { LoginRequest, LoginResponse } from "@/types/auth.types"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

interface Props {
  form: UseFormReturn<LoginFormValues>
  mutation: UseMutationResult<LoginResponse, AxiosError<unknown>, LoginRequest>
  onSubmit: (values: LoginFormValues) => void
}

export default function LoginForm({ form, mutation, onSubmit }: Props) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-brand-deepblue sm:text-5xl">
          Welcome, Admin
        </h1>

        <p className="mx-auto max-w-lg text-base leading-relaxed text-slate-600">
          Sign in to the Prime Edge Dashboard where all the work happens. Use
          the log in details in your email to sign in. You can change your
          password when you like.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 rounded-lg bg-card p-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="example@acme.com"
                    disabled={mutation.isPending}
                    className="h-12"
                    {...field}
                  />
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
                      autoComplete="current-password"
                      placeholder="••••••••"
                      disabled={mutation.isPending}
                      className="h-12 pr-10"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-sm text-muted-foreground">
            Forgot your password? Contact a super-admin to reset it.
          </p>

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  I agree to the terms and conditions
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-12 w-full rounded-full bg-brand-deepblue text-base text-primary-foreground hover:bg-brand-deepblue-hover"
          >
            {mutation.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
