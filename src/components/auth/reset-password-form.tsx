"use client"

import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ResetPasswordFormValues } from "@/views/reset-password-page"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

export default function ResetPasswordForm({
  form,
  onSubmit,
  isPending,
}: {
  form: UseFormReturn<ResetPasswordFormValues>
  onSubmit: (values: ResetPasswordFormValues) => void
  isPending?: boolean
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-1">
      <h1 className="text-center font-heading text-3xl font-semibold tracking-tight text-brand-deepblue">
        Change Password
      </h1>
      <p className="text-center text-sm text-muted-foreground">
        Enter your new password
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-6">
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
                      autoComplete="new-password"
                      placeholder="••••••••"
                      disabled={isPending}
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

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-enter Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      disabled={isPending}
                      className="h-12 pr-10"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="h-12 w-full rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : "Submit"}
          </Button>

          <div className="flex justify-center pt-2">
            <Link
              href="/login"
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-brand-deepblue"
            >
              Back to Sign in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
