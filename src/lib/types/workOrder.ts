export type WorkOrder = {
    id: string;
    title: string;
    description: string;
    vehicleId: string;
    assignedMechanicId?: string;
    status: 'draft' | 'assigned' | 'in-progress' | 'paused' | 'review' | 'completed' | 'archived';
    priority: 'low' | 'medium' | 'high' | 'emergency';
    cost: number;
    startDate?: string;
    completionDate?: string;
    createdAt: string;
};