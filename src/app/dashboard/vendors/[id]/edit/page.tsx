import { getVendor } from "@/lib/actions/vendors";
import EditVendorClientPage from "./client";

export default async function EditVendorPage({ params }: { params: { id: string } }) {
  const vendor = await getVendor(params.id)

  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  return (
    <EditVendorClientPage vendor={vendor} />
  );
}
