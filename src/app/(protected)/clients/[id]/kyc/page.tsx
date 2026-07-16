import { Metadata } from "next";
import ClientKycPage from "@/views/client-kyc-page";

export const metadata: Metadata = {
  title: "KYC Form Details | Prime Edge Admin",
  description: "Review and approve client KYC submissions.",
};

export default async function ClientKyc({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ClientKycPage id={id} />;
}
