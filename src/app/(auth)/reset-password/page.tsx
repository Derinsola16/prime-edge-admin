import { Suspense } from "react";
import { Metadata } from "next";
import ResetPasswordPage from "@/views/reset-password-page";
import PageLoading from "@/components/shared/page-loading";

export const metadata: Metadata = {
  title: "Change Password | Prime Edge Admin",
  description: "Set a new password for your Prime Edge Admin account.",
};

export default function ResetPassword() {
  return (
    <Suspense fallback={<PageLoading />}>
      <ResetPasswordPage />
    </Suspense>
  );
}
