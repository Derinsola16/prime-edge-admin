import { Metadata } from "next";
import LoginPage from "@/views/login-page";

export const metadata: Metadata = {
  title: "Login | Prime Edge Admin",
  description: "Sign in to the Prime Edge Admin Dashboard.",
};

export default function Login() {
  return <LoginPage />;
}
