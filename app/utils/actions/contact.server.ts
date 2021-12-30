import nodemailer from "nodemailer";
import { json, redirect } from "remix";
import client from "../../config/client";

export default async function (request: Request) {
    const formData = await request.formData();

    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const body = formData.get("content") as string | null;

    if (!name || !email || !body) return json({ error: true, msg: "All fields required!" }, { status: 400 });

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 25,
            secure: false,
            auth: {
                user: process.env.MAIL_FROM,
                pass: process.env.MAIL_PW,
            },
        });

        await transporter.sendMail({
            from: `Contactform <${process.env.MAIL_FROM}>`,
            to: process.env.MAIL_TO,
            subject: "Contactform Message",
            text: `${name} hat dir eine Nachricht über die Kontaktform zukommen lassen:\n\n${body}\n\nE-Mail: ${email}`,
        });

        await client.sent_emails.create({
            data: {
                email,
            },
        });

        return redirect(`/email-sent?email=${email}`);
    } catch (e) {
        console.log(e);
        return json({ error: true, msg: "Unknown error occured" }, { status: 500 });
    }
}
