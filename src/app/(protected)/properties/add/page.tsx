import { Metadata } from "next";
import AddPropertyPage from "@/views/add-property-page";

export const metadata: Metadata = {
  title: "Add Property | Prime Edge Admin",
  description: "Add a new property listing to Prime Edge.",
};

export default function AddProperty() {
  return <AddPropertyPage />;
}
