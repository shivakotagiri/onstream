import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface sendEmailProps {
    to: string,
    subject: string,
    html: string,
    text: string
}

export async function sendEmail({ to, subject, html, text }: sendEmailProps) {
    const res = await resend.emails.send({
        from: 'onStream <contact@onstream.shivakotagiri.in>',
        to,
        subject,
        html,
        text,
    });
    return res;
}