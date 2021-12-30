import { ActionFunction, Form, LoaderFunction, useActionData, useLoaderData, useTransition } from "remix";
import contactServer from "../utils/actions/contact.server";
import getLang from "../utils/getLang";
import en from "../utils/lang/en";

export const loader: LoaderFunction = ({ request }) => {
    const lang = getLang(request);

    return lang;
};

export const action: ActionFunction = async ({ request }) => {
    return await contactServer(request);
};

function Contact() {
    const data = useLoaderData<typeof en>();
    const actionData = useActionData();
    const transition = useTransition();

    const loading = transition.state === "submitting";

    return (
        <Form className="contact-container" method="post">
            <input disabled={loading} placeholder={data.generic_name} name="name" required />
            <input disabled={loading} placeholder={data.generic_email} type="email" name="email" required />
            <textarea disabled={loading} placeholder={data.contact_body} name="content" required></textarea>
            <br />
            <button type="submit" disabled={loading}>
                {data.generic_send}
            </button>
        </Form>
    );
}

export default Contact;
