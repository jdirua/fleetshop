
export type FuelLog = {
    id: string;
    vehicleId: string;
    date: string;
    liters: number;
    cost: number;
    odometer: number;
};

export type FormState = {
  errors?: {
    [key: string]: string[] | undefined;
  };
  message?: string | null;
};