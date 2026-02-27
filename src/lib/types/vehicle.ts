export type Vehicle = {
    id: string;
    registration: string;
    vin: string;
    make: string;
    model: string;
    year: number;
    status: 'active' | 'in-shop' | 'decommissioned';
    currentOdometer: number;
    serviceDate?: string; 
    assignedDriverId?: string;
    notes?: string;
  };