
import { getInventoryItems } from "@/lib/actions/inventory";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function InventoryPage() {
  const inventoryItems = await getInventoryItems();

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Inventory</h1>
            <Button asChild>
                <Link href="/dashboard/inventory/new">Add New Item</Link>
            </Button>
        </div>
      <DataTable columns={columns} data={inventoryItems} filterColumn="name" />
    </div>
  );
}
