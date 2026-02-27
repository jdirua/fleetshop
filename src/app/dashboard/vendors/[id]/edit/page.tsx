
import { getVendor } from "@/lib/actions/vendors";
import { getDocumentsFor } from "@/lib/actions/documents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VendorForm } from "@/components/forms/VendorForm";
import { DocumentManager } from "@/components/DocumentManager";
import { notFound } from "next/navigation";

export default async function EditVendorPage({ params }: { params: { id: string } }) {
  const vendor = await getVendor(params.id);
  
  if (!vendor) {
    notFound();
  }

  const documents = await getDocumentsFor('vendors', params.id);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Vendor</CardTitle>
        </CardHeader>
        <CardContent>
          <VendorForm vendor={vendor} />
        </CardContent>
      </Card>
      <DocumentManager relatedTo={`vendors/${params.id}`} initialDocuments={documents} />
    </div>
  );
}
