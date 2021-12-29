import { LoaderFunction, MetaFunction, useLoaderData } from "remix";
import getLang from "~/utils/getLang";
import en from "~/utils/lang/en";

export const meta: MetaFunction = ({ data }) => {
    return {
        title: `lukasstaub.dev - ${data.lang.title_about_me}`,
    };
};

export const loader: LoaderFunction = ({ request }) => {
    const lang = getLang(request);

    return { lang };
};

function About() {
    const { lang } = useLoaderData<{ lang: typeof en }>();

    return (
        <main className="about-container">
            <section>
                <h1>{lang.title_about_me}</h1>
            </section>
            <section dangerouslySetInnerHTML={{ __html: lang.about_me }}></section>
        </main>
    );
}

export default About;
