'use client';

import { VendorForm } from "@/components/forms/VendorForm";
import { Vendor } from "@/lib/types/vendor";
import { updateVendor } from "@/lib/actions/vendors";
import { useRouter } from 'next/navigation';

export default function EditVendorClientPage({ vendor }: { vendor: Vendor }) {
  const router = useRouter();

  const handleSubmit = async (data: Vendor) => {
    await updateVendor(vendor.id, data);
    router.push('/dashboard/vendors');
  };

  return (
    <div className="space-y-6">
      <VendorForm vendor={vendor} onSubmit={handleSubmit} />
    </div>
  );
}
