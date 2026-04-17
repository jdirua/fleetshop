export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    cost: number;
    reorderPoint?: number;
    supplier?: string;
    location?: string;
    lastRestocked: string;
    createdAt: string;
  }
  