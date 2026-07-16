import { Metadata } from "next";
import CmsOverviewPage from "@/views/cms-overview-page";

export const metadata: Metadata = {
  title: "Website CMS | Prime Edge Admin",
  description: "Manage the Prime Edge public website content.",
};

export default function CmsOverview() {
  return <CmsOverviewPage />;
}
