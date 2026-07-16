import { Metadata } from "next";
import SupportPage from "@/views/support-page";

export const metadata: Metadata = {
  title: "Support | Prime Edge Admin",
  description: "Chat with clients and manage support conversations.",
};

export default function Support() {
  return <SupportPage />;
}
