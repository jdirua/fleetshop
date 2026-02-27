
import { getInventoryItem } from "@/lib/actions/inventory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InventoryItemForm } from "@/components/forms/InventoryItemForm";
import { notFound } from "next/navigation";

export default async function EditInventoryItemPage({ params }: { params: { id: string } }) {
  const inventoryItem = await getInventoryItem(params.id);

  if (!inventoryItem) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Inventory Item</CardTitle>
      </CardHeader>
      <CardContent>
        <InventoryItemForm inventoryItem={inventoryItem} />
      </CardContent>
    </Card>
  );
}
