'use server'

export async function sendEmail(prevSate: unknown, formData: FormData) {
    const { Resend } = await import("resend");
    const { default: EmailTemplate } = await import("../../_components/form/email");
    const { renderToStaticMarkup } = await import("react-dom/server");

    const resend = new Resend('re_d3PS6GY3_GyBFzBkmuYrNnFcuMxDrdqvu');

    const [name, email, date, subject, description] = [...formData.values()].map(value => value.toString().trim());

    if (name.length < 3) return { success: false, error: "Name most to be 3 or more letters" };
    else if (subject.length < 10) return { success: false, error: "Subject most to be 10 or more characters. Be more descriptive!" };

    const response = await resend.emails.send({
        from: 'Sofi Nails Contact Email <contact@sofinailsandlashesspa.com>',
        to: 'contact@sofinailsandlashesspa.com',
        replyTo: email,
        subject: subject,
        html: renderToStaticMarkup(
            <EmailTemplate name={name} date={date} details={description} />
        )
    });

    if(response.error) {
        return { success: false, error: `${response.error.message} Email didn't send correctly. Check connection and try again!` }
    }
    return { success: true, error: null }
}