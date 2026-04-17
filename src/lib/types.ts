import { UserRole } from '@/lib/auth/roles';

export interface Document {
    id: string;
    name: string;
    category: string;
    url: string;
    filePath: string;
    uploadedAt: Date;
    userId: string;
    relatedTo?: {
        type: string;
        id: string;
    };
}

export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    registration: string;
    vin: string;
    status: string;
    currentOdometer: number;
}

export type WorkOrderStatus = 'draft' | 'assigned' | 'in-progress' | 'paused' | 'review' | 'completed' | 'archived';
export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'emergency';

export interface WorkOrder {
    id: string;
    title: string;
    description: string;
    vehicleId: string;
    status: WorkOrderStatus;
    priority: WorkOrderPriority;
    cost: number;
}

export interface User {
    uid: string;
    displayName: string | null;
    email: string | null;
    role: UserRole | null;
}

export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    cost: number;
    supplier?: string;
    location?: string;
    reorderPoint?: number;
}
