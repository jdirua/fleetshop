import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const VehicleSchema = z.object({
  registration: z.string()
    .min(2, { message: "Registration must be at least 2 characters." })
    .max(15, { message: "Registration must be 15 characters or less." })
    .regex(/^[a-zA-Z0-9-]+$/, { message: "Registration can only contain letters, numbers, and hyphens." }),

  vin: z.string()
    .length(17, { message: "VIN must be exactly 17 characters." })
    .regex(/^[a-zA-Z0-9]+$/, { message: "VIN can only contain letters and numbers." })
    .optional()
    .or(z.literal('')),

  make: z.string()
    .min(2, { message: "Make must be at least 2 characters." })
    .max(50, { message: "Make must be 50 characters or less." }),

  model: z.string()
    .min(1, { message: "Model is required." })
    .max(50, { message: "Model must be 50 characters or less." }),

  year: z.coerce.number()
    .int()
    .min(1900, { message: "Year must be after 1900." })
    .max(currentYear + 1, { message: `Year can't be later than ${currentYear + 1}.` }),

  status: z.enum(['active', 'in-shop', 'decommissioned'], { required_error: "A status is required." }),

  currentOdometer: z.coerce.number()
    .int()
    .min(0, { message: "Odometer reading must be a positive number." }),

  serviceDate: z.coerce.date({
    required_error: "Next service date is required.",
    invalid_type_error: "Please enter a valid date.",
  }).refine(date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare dates without time
    return date >= today;
  }, { message: "Service date cannot be in the past." }),

  assignedDriverId: z.string().optional().or(z.literal('')),
  
  notes: z.string()
    .max(500, { message: "Notes must be 500 characters or less." })
    .optional()
    .or(z.literal('')),
});
