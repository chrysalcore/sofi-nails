import { z } from "zod";

export const reservationSchema = z.object({
    name: z.string().trim().min(3, "Name must be 3 or more letters"),
    email: z.email("Enter a valid email address"),
    date: z.iso.datetime({ local: true, error: "Pick a valid date" }),
    subject: z
        .string()
        .trim()
        .min(10, "Subject must be 10 or more characters. Be more descriptive!"),
    description: z.preprocess((val) => val ?? "", z.string().trim()),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
