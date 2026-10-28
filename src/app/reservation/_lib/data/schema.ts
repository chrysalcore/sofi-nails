import { z } from "zod";
import { firstDay, formatHour, lastDay, openingHours } from "@/lib/data/hours";

const { days, opens, lastBooking, closes, timeZone } = openingHours;

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

function nowAtSalon() {
    return new Date()
        .toLocaleString("sv-SE", { timeZone })
        .replace(" ", "T")
        .slice(0, 16);
}

function weekdayOf(date: string) {
    return weekdays[new Date(`${date.slice(0, 10)}T00:00Z`).getUTCDay()];
}

function timeOf(date: string) {
    return date.slice(11, 16);
}

export const reservationSchema = z.object({
    name: z.string().trim().min(3, "Name must be 3 or more letters"),
    email: z.email("Enter a valid email address"),
    date: z.iso
        .datetime({ local: true, error: "Pick a valid date", abort: true })
        .refine((date) => date.slice(0, 16) > nowAtSalon(), {
            error: "Pick a date and time in the future",
            abort: true,
        })
        .refine((date) => days.includes(weekdayOf(date)), {
            error: `We're open ${firstDay} to ${lastDay}. Pick another day`,
            abort: true,
        })
        .refine((date) => timeOf(date) >= opens && timeOf(date) < closes, {
            error: `We're open from ${formatHour(opens)} to ${formatHour(closes)}. Pick another time`,
            abort: true,
        })
        .refine((date) => timeOf(date) <= lastBooking, {
            error: `Our last appointment starts at ${formatHour(lastBooking)}, so your service ends before we close at ${formatHour(closes)}. Pick an earlier time`,
        }),
    subject: z
        .string()
        .trim()
        .min(10, "Subject must be 10 or more characters. Be more descriptive!"),
    description: z.preprocess((val) => val ?? "", z.string().trim()),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
