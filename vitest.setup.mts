import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

vi.mock("next/font/local", () => ({
    default: () => ({ className: "font" }),
}));

afterEach(() => {
    cleanup();
});
