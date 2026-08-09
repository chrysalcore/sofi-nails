import { describe, expect, it } from "vitest";
import { reservationSchema } from "@/app/reservation/_lib/data/schema";

const validInput = {
    name: "Sofi",
    email: "sofi@example.com",
    date: "2026-08-09T10:00",
    subject: "Nail appointment",
    description: "First time client",
};

describe("reservationSchema", () => {
    it("accepts a fully valid reservation", () => {
        const result = reservationSchema.safeParse(validInput);

        expect(result.success).toBe(true);
    });

    it("defaults a missing description to an empty string", () => {
        const result = reservationSchema.safeParse({
            name: validInput.name,
            email: validInput.email,
            date: validInput.date,
            subject: validInput.subject,
        });

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.description).toBe("");
        }
    });

    it("rejects a name shorter than 3 characters", () => {
        const result = reservationSchema.safeParse({ ...validInput, name: "So" });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe(
                "Name must be 3 or more letters",
            );
        }
    });

    it("rejects an invalid email address", () => {
        const result = reservationSchema.safeParse({
            ...validInput,
            email: "not-an-email",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe(
                "Enter a valid email address",
            );
        }
    });

    it("rejects a date that isn't ISO local datetime", () => {
        const result = reservationSchema.safeParse({
            ...validInput,
            date: "08/09/2026",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe("Pick a valid date");
        }
    });

    it("rejects a subject shorter than 10 characters", () => {
        const result = reservationSchema.safeParse({
            ...validInput,
            subject: "Too short",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe(
                "Subject must be 10 or more characters. Be more descriptive!",
            );
        }
    });
});
