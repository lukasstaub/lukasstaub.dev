import { social_links } from "@prisma/client";
import { LoaderFunction, MetaFunction, useLoaderData } from "remix";
import client from "../config/client";
import getLang from "../utils/getLang";

export const meta: MetaFunction = ({ data }) => {
    return {
        title: `lukasstaub.dev - ${data.lang.title_links}`,
    };
};

export const loader: LoaderFunction = async ({ request }) => {
    const lang = getLang(request);

    const links = await client.social_links.findMany();

    return { lang, links };
};

function Links() {
    const { links } = useLoaderData<{ links: social_links[] }>();
    return (
        <main className="links-container">
            {links.map((link) => {
                return (
                    <a href={link.url} className="btn" target="_blank">
                        {link.icon && <i className={`fab ${link.icon} brand-icon`}></i>} {link.label}
                    </a>
                );
            })}
        </main>
    );
}

export default Links;
