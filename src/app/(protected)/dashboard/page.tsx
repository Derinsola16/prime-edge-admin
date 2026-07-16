import { Metadata } from "next";
import DashboardPage from "@/views/dashboard-page";

export const metadata: Metadata = {
  title: "Overview | Prime Edge Admin",
  description: "Prime Edge admin dashboard overview.",
};

export default function Dashboard() {
  return <DashboardPage />;
}
