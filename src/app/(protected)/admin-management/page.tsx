import { Metadata } from "next";
import AdminManagementPage from "@/views/admin-management-page";

export const metadata: Metadata = {
  title: "Admin Management | Prime Edge Admin",
  description: "Manage admin team members, roles, and permissions.",
};

export default function AdminManagement() {
  return <AdminManagementPage />;
}
