"use server";

export async function sendEmail(prevSate: unknown, formData: FormData) {
    const { Resend } = await import("resend");
    const { default: EmailTemplate } =
        await import("../../_components/form/email");
    const { renderToStaticMarkup } = await import("react-dom/server");

    const resend = new Resend(process.env.RESEND_API_KEY!);

    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const date = formData.get("date")?.toString().trim() ?? "";
    const subject = formData.get("subject")?.toString().trim() ?? "";
    const description = formData.get("description")?.toString().trim() ?? "";

    if (name.length < 3)
        return {
            success: false,
            error: "Name must be 3 or more letters" + name,
        };
    else if (subject.length < 10)
        return {
            success: false,
            error:
                "Subject must be 10 or more characters. Be more descriptive!" +
                subject,
        };

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
