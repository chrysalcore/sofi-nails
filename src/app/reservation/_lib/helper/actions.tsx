"use server";

import { reservationSchema } from "../data/schema";

export async function sendEmail(prevSate: unknown, formData: FormData) {
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
        return { success: false, error: parsed.error.issues[0].message };
    }

    const { name, email, date, subject, description } = parsed.data;

    const response = await resend.emails.send({
        from: "Sofi Nails Contact Email <contact@sofinailsandlashesspa.com>",
        to: "contact@sofinailsandlashesspa.com",
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
            success: false,
            error: `${response.error.message} Email didn't send correctly. Check connection and try again!`,
        };
    }
    return { success: true, error: null };
}
