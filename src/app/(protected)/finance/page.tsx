import { Metadata } from "next";
import FinancePage from "@/views/finance-page";

export const metadata: Metadata = {
  title: "Finance Management | Prime Edge Admin",
  description: "Track capital inflow, payouts, and transactions.",
};

export default function Finance() {
  return <FinancePage />;
}
