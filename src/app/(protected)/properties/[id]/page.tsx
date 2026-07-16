import { Metadata } from "next";
import PropertyDetailsPage from "@/views/property-details-page";

export const metadata: Metadata = {
  title: "Property Details | Prime Edge Admin",
  description: "View property details, financials, and investment summary.",
};

export default async function PropertyDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PropertyDetailsPage id={id} />;
}
