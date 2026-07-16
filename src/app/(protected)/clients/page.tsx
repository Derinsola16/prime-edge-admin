import { Metadata } from "next";
import ClientsPage from "@/views/clients-page";

export const metadata: Metadata = {
  title: "Client Management | Prime Edge Admin",
  description: "Manage clients, KYC status, and portfolios.",
};

export default function Clients() {
  return <ClientsPage />;
}
