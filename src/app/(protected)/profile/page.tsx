import { Metadata } from "next";
import AdminProfilePage from "@/views/admin-profile-page";

export const metadata: Metadata = {
  title: "Admin Profile | Prime Edge Admin",
  description: "Manage your admin profile information.",
};

export default function AdminProfile() {
  return <AdminProfilePage />;
}
