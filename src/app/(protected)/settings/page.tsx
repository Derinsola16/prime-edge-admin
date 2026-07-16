import { Metadata } from "next";
import SettingsPage from "@/views/settings-page";

export const metadata: Metadata = {
  title: "Settings | Prime Edge Admin",
  description: "Manage notification and security settings.",
};

export default function Settings() {
  return <SettingsPage />;
}
