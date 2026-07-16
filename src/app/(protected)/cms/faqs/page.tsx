import { Metadata } from "next";
import CmsFaqsPage from "@/views/cms-faqs-page";

export const metadata: Metadata = {
  title: "Website CMS - FAQs | Prime Edge Admin",
  description: "Manage frequently asked questions.",
};

export default function CmsFaqs() {
  return <CmsFaqsPage />;
}
