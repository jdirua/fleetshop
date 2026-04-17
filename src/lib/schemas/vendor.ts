import { z } from "zod";

export const vendorSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    contactName: z.string().optional(),
    contactEmail: z.string().email("Invalid email address.").optional().or(z.literal('')),
    contactPhone: z.string().optional(),
});
