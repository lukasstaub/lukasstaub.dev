import { projects } from "@prisma/client";
import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import client from "../config/client.server";
import getLang from "../utils/getLang";
import en from "../utils/lang/en";

export const meta: MetaFunction = ({ data }) => {
    return {
        title: `lukasstaub.dev - ${data.lang.title_projects}`,
    };
};

export const loader: LoaderFunction = async ({ request }) => {
    const lang = getLang(request);

    const projects = await client.projects.findMany({ orderBy: { timestamp: "desc" } });

    return { lang, projects };
};

function Projects() {
    const { lang, projects } = useLoaderData<{ lang: typeof en; projects: projects[] }>();

    return (
        <main className="projects-container">
            {projects.length > 0 ? (
                <div>
                    {projects.map((project) => (
                        <div className="project-card">
                            <img src={project.image_url} alt="project-logo" />
                            <div>
                                <h1>{project.name}</h1>
                                <Link prefetch="intent" to={`/projects/${project.slug}`} className="btn-link">
                                    {lang.generic_read_more}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p>{lang.projects_not_found}</p>
                </div>
            )}
        </main>
    );
}

export default Projects;
