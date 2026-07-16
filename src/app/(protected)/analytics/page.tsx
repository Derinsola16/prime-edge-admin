import { Metadata } from "next";
import AnalyticsPage from "@/views/analytics-page";

export const metadata: Metadata = {
  title: "Platform Analytics | Prime Edge Admin",
  description: "Platform-wide analytics and reporting.",
};

export default function Analytics() {
  return <AnalyticsPage />;
}
