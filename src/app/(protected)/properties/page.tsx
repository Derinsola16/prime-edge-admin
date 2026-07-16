import { Metadata } from "next";
import PropertiesPage from "@/views/properties-page";

export const metadata: Metadata = {
  title: "Property Management | Prime Edge Admin",
  description: "Manage properties, track construction progress, and more.",
};

export default function Properties() {
  return <PropertiesPage />;
}
