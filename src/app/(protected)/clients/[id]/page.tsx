import { Metadata } from "next";
import ClientDetailsPage from "@/views/client-details-page";

export const metadata: Metadata = {
  title: "Client Details | Prime Edge Admin",
  description: "View client profile, funding, and activity.",
};

export default async function ClientDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ClientDetailsPage id={id} />;
}
