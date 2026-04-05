'use client';

import { InventoryItem } from "@/lib/types/inventory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export function InventoryCard({ item }: { item: InventoryItem }) {
  return (
    <Card className="bg-slate-800/75 backdrop-blur-lg border border-slate-300/20">
      <CardHeader>
        <div className="flex items-start justify-between">
            <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
            <Package className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p className="text-muted-foreground">Quantity</p>
          <p className="font-semibold text-lg">{item.quantity}</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">Cost</p>
          <p className="font-semibold text-lg">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PGK' }).format(item.cost)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">Reorder Point</p>
          <p className="font-semibold text-lg">{item.reorderPoint}</p>
        </div>
        {item.supplier && (
            <div className="space-y-1">
                <p className="text-muted-foreground">Supplier</p>
                <p className="font-semibold">{item.supplier}</p>
            </div>
        )}
        {item.location && (
             <div className="space-y-1 col-span-2">
                <p className="text-muted-foreground">Location</p>
                <p className="font-semibold">{item.location}</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
