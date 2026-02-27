
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InventoryItemForm } from "@/components/forms/InventoryItemForm";

export default function NewInventoryItemPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Inventory Item</CardTitle>
      </CardHeader>
      <CardContent>
        <InventoryItemForm />
      </CardContent>
    </Card>
  );
}
