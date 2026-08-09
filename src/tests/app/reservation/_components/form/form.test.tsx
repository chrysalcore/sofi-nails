import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Resend } from "resend";
import Form from "@/app/reservation/_components/form/form";

const { mockSend } = vi.hoisted(() => ({ mockSend: vi.fn() }));

vi.mock("resend", () => ({
    Resend: vi.fn(),
}));

vi.mock("next/navigation", () => ({
    useSearchParams: () => new URLSearchParams(),
}));

beforeEach(() => {
    vi.mocked(Resend).mockImplementation(function () {
        return { emails: { send: mockSend } } as unknown as Resend;
    });
    mockSend.mockResolvedValue({ data: { id: "email_123" }, error: null });
});

async function fillValidForm() {
    await userEvent.type(
        screen.getByPlaceholderText("Anna Smith"),
        "Sofi Perez",
    );
    await userEvent.type(
        screen.getByPlaceholderText("annasmith@gmail.com"),
        "sofi@example.com",
    );
    fireEvent.change(screen.getByPlaceholderText("01/01/2000"), {
        target: { value: "2026-08-09T10:00" },
    });
    await userEvent.type(
        screen.getByPlaceholderText("Manicure"),
        "Nail appointment",
    );
    await userEvent.type(
        screen.getByPlaceholderText("I want to..."),
        "First time client",
    );
}

describe("Form", () => {
    it("sends the email and shows a success message", async () => {
        render(<Form />);

        await fillValidForm();
        await userEvent.click(screen.getByRole("button", { name: /submit/i }));

        expect(
            await screen.findByText("Email sended successfully"),
        ).toBeInTheDocument();
        expect(mockSend).toHaveBeenCalledTimes(1);
        const call = mockSend.mock.calls[0][0];
        expect(call.replyTo).toBe("sofi@example.com");
        expect(call.subject).toBe("Nail appointment");
    });

    it("shows the Zod error and never calls Resend when a field is invalid", async () => {
        render(<Form />);

        await fillValidForm();
        await userEvent.clear(screen.getByPlaceholderText("Manicure"));
        await userEvent.type(screen.getByPlaceholderText("Manicure"), "Short");
        await userEvent.click(screen.getByRole("button", { name: /submit/i }));

        expect(
            await screen.findByText(
                "Subject must be 10 or more characters. Be more descriptive!",
            ),
        ).toBeInTheDocument();
        expect(mockSend).not.toHaveBeenCalled();
    });

    it("shows Resend's error when the email fails to send", async () => {
        mockSend.mockResolvedValue({
            data: null,
            error: { message: "Invalid API key." },
        });
        render(<Form />);

        await fillValidForm();
        await userEvent.click(screen.getByRole("button", { name: /submit/i }));

        expect(
            await screen.findByText(
                "Invalid API key. Email didn't send correctly. Check connection and try again!",
            ),
        ).toBeInTheDocument();
    });
});
