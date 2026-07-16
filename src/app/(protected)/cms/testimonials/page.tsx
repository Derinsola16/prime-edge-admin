import { Metadata } from "next";
import CmsTestimonialsPage from "@/views/cms-testimonials-page";

export const metadata: Metadata = {
  title: "Website CMS - Testimonials | Prime Edge Admin",
  description: "Review and approve client testimonials.",
};

export default function CmsTestimonials() {
  return <CmsTestimonialsPage />;
}
