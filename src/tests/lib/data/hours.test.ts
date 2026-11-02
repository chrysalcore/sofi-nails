import { describe, expect, it } from "vitest";
import { formatHour, hoursText } from "@/lib/data/hours";

describe("hours", () => {
    it("formats 24h times as the short am/pm the site shows", () => {
        expect(formatHour("00:00")).toBe("12am");
        expect(formatHour("10:00")).toBe("10am");
        expect(formatHour("12:00")).toBe("12pm");
        expect(formatHour("17:30")).toBe("5:30pm");
    });

    it("builds the opening hours text from the schedule", () => {
        expect(hoursText).toBe("Tuesday - Saturday, 10am - 7pm");
    });
});
