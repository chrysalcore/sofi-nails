"use server";

import { reservationSchema, type ReservationInput } from "../data/schema";

export type ReservationState =
    | { status: "idle" }
    | { status: "error"; error: string }
    | {
          status: "sent";
          reservation: Pick<ReservationInput, "name" | "date" | "subject">;
      };

const recipient =
    process.env.NODE_ENV === "production"
        ? "contact@sofinailsandlashesspa.com"
        : "delivered@resend.dev";

export async function sendEmail(
    prevState: ReservationState,
    formData: FormData,
): Promise<ReservationState> {
    const { Resend } = await import("resend");
    const { default: EmailTemplate } =
        await import("../../_components/form/email");
    const { renderToStaticMarkup } = await import("react-dom/server");

    const resend = new Resend(process.env.RESEND_API_KEY!);

    const parsed = reservationSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        date: formData.get("date"),
        subject: formData.get("subject"),
        description: formData.get("description"),
    });

    if (!parsed.success) {
        return { status: "error", error: parsed.error.issues[0].message };
    }

    const { name, email, date, subject, description } = parsed.data;

    const response = await resend.emails.send({
        from: "Sofi Nails Contact Email <contact@sofinailsandlashesspa.com>",
        to: recipient,
        replyTo: email,
        subject: subject,
        html: renderToStaticMarkup(
            <EmailTemplate
                name={name}
                date={new Date(date).toLocaleString("en-US")}
                details={description}
            />,
        ),
    });

    if (response.error) {
        return {
            status: "error",
            error: `${response.error.message} Email didn't send correctly. Check connection and try again!`,
        };
    }
    return { status: "sent", reservation: { name, date, subject } };
}
