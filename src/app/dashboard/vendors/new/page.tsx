
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VendorForm } from "@/components/forms/VendorForm";

export default function NewVendorPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Vendor</CardTitle>
      </CardHeader>
      <CardContent>
        <VendorForm />
      </CardContent>
    </Card>
  );
}
