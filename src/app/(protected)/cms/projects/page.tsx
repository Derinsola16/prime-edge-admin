import { Metadata } from "next";
import CmsProjectsPage from "@/views/cms-projects-page";

export const metadata: Metadata = {
  title: "Website CMS - Projects | Prime Edge Admin",
  description: "Manage projects shown on the public website.",
};

export default function CmsProjects() {
  return <CmsProjectsPage />;
}
