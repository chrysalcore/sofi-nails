import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { reservationSchema } from "@/app/reservation/_lib/data/schema";

const validInput = {
    name: "Sofi",
    email: "sofi@example.com",
    date: "2026-11-03T10:00",
    subject: "Nail appointment",
    description: "First time client",
};

function firstIssue(date: string) {
    const result = reservationSchema.safeParse({ ...validInput, date });

    return result.success ? undefined : result.error.issues[0].message;
}

describe("reservationSchema", () => {
    beforeEach(() => {
        vi.useFakeTimers({ toFake: ["Date"] });
        vi.setSystemTime(new Date("2026-11-01T12:00:00Z"));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

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
        const result = reservationSchema.safeParse({
            ...validInput,
            name: "So",
        });

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

    it("rejects a date in the past", () => {
        expect(firstIssue("2026-10-31T10:00")).toBe(
            "Pick a date and time in the future",
        );
    });

    it("compares against the salon's clock, not the server's UTC clock", () => {
        vi.setSystemTime(new Date("2026-11-03T16:00:00Z"));

        expect(firstIssue("2026-11-03T12:00")).toBeUndefined();
        expect(firstIssue("2026-11-03T10:30")).toBe(
            "Pick a date and time in the future",
        );
    });

    it("rejects a day the salon is closed", () => {
        expect(firstIssue("2026-11-02T10:00")).toBe(
            "We're open Tuesday to Saturday. Pick another day",
        );
    });

    it("rejects a time outside opening hours", () => {
        expect(firstIssue("2026-11-03T09:59")).toBe(
            "We're open from 10am to 7pm. Pick another time",
        );
        expect(firstIssue("2026-11-03T19:00")).toBe(
            "We're open from 10am to 7pm. Pick another time",
        );
    });

    it("accepts the last booking time and explains why later ones aren't", () => {
        expect(firstIssue("2026-11-03T18:00")).toBeUndefined();
        expect(firstIssue("2026-11-03T18:30")).toBe(
            "Our last appointment starts at 6pm, so your service ends before we close at 7pm. Pick an earlier time",
        );
    });
});
