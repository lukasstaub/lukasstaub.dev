import { LoaderFunction, useLoaderData, useSearchParams } from "remix";
import getLang from "../utils/getLang";

export const loader: LoaderFunction = ({ request }) => {
    const lang = getLang(request);

    return lang.lang;
};

function EmailSent() {
    const contact_email_sent_de = (email: string) => `Danke, dass Sie sich bei mir gemeldet haben!\nIch werde mich bei Ihnen unter ${email} melden.\nEinen schönen Tag Ihnen noch!`;
    const contact_email_send_en = (email: string) => `Thank you for getting in touch with me!\nI'll get back to you at ${email}.\nHave a nice day!`;

    const lang = useLoaderData<string>();
    const query = useSearchParams();

    if (!query[0].get("email")) return null;

    return (
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <img src="/assets/email-sent.svg" alt="mail sent" style={{ marginBottom: "36px", maxWidth: "300px" }} />
            <h3 style={{ textAlign: "center", whiteSpace: "pre-wrap" }}>{lang === "de" ? contact_email_sent_de(query[0].get("email")!) : contact_email_send_en(query[0].get("email")!)}</h3>
        </main>
    );
}

export default EmailSent;
