import { Metadata } from "next";
import CmsAddProjectPage from "@/views/cms-add-project-page";

export const metadata: Metadata = {
  title: "Add Project | Prime Edge Admin",
  description: "Add a new project to the Prime Edge public website.",
};

export default function CmsAddProject() {
  return <CmsAddProjectPage />;
}
