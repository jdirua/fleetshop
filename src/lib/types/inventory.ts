
export type InventoryItem = {
    id: string;
    name: string;
    quantity: number;
    cost: number;
    supplier?: string;
    location?: string;
    reorderPoint?: number;
    createdAt: string;
};

export type FormState = {
  errors?: {
    [key: string]: string[] | undefined;
  };
  message?: string | null;
};