import { projects } from "@prisma/client";
import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import client from "../config/client.server";
import getLang from "../utils/getLang";
import en from "../utils/lang/en";

export const meta: MetaFunction = ({ data }) => {
    return { title: data.project.name };
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const lang = getLang(request);
    const project = await client.projects.findFirst({ where: { slug: params.slug } });

    if (!project)
        throw new Response("Not Found", {
            status: 404,
        });

    return { lang, project };
};

function Project() {
    const { lang, project } = useLoaderData<{ lang: typeof en; project: projects }>();

    const date = new Date(project.timestamp);

    return (
        <main className="project-container">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h1>{project.name}</h1>
            </div>
            <hr />
            <div className="contents ck-content" dangerouslySetInnerHTML={{ __html: project.content }}></div>
        </main>
    );
}

export default Project;
