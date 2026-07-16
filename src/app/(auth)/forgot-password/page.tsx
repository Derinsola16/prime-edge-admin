import { Metadata } from "next";
import ForgotPasswordPage from "@/views/forgot-password-page";

export const metadata: Metadata = {
  title: "Forgot Password | Prime Edge Admin",
  description: "Reset your Prime Edge Admin account password.",
};

export default function ForgotPassword() {
  return <ForgotPasswordPage />;
}
