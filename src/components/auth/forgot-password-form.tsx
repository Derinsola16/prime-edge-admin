"use client"

import Link from "next/link"
import { Loader2 } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ForgotPasswordFormValues } from "@/views/forgot-password-page"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

export default function ForgotPasswordForm({
  form,
  onSubmit,
  isPending,
}: {
  form: UseFormReturn<ForgotPasswordFormValues>
  onSubmit: (values: ForgotPasswordFormValues) => void
  isPending?: boolean
}) {
  return (
    <div className="space-y-1">
      <h1 className="text-center font-heading text-3xl font-semibold tracking-tight text-brand-deepblue">
        Forgot Password
      </h1>
      <p className="text-center text-sm text-muted-foreground">
        Enter your email and we&apos;ll send you a link to reset your password
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-6">
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
                    disabled={isPending}
                    className="h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="h-12 w-full rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : "Send Reset Link"}
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
