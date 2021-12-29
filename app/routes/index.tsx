import { projects } from "@prisma/client";
import { useEffect } from "react";
import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import client from "~/config/client";
import getLang from "~/utils/getLang";
import en from "~/utils/lang/en";

export const meta: MetaFunction = ({ data }) => {
    return {
        title: `lukasstaub.dev - ${data.lang.title_home}`,
    };
};

export const loader: LoaderFunction = async ({ request }) => {
    const projects = await client.projects.findMany({ orderBy: { timestamp: "desc" }, take: 4 });
    const lang = getLang(request);

    return { projects, lang };
};

export default function Index() {
    const { projects, lang } = useLoaderData<{ projects: projects[]; lang: typeof en }>();

    return (
        <main className="home-content">
            <div className="home-inner-top">
                <section className="message">
                    <p className="top">{lang.home_top}</p>
                    <p className="big">{lang.home_middle}</p>
                    <p className="bottom">
                        {lang.home_bottom_one}
                        <br />
                        {lang.home_bottom_two}
                    </p>
                </section>
                <section>
                    <img src="/assets/front-asset.svg" alt="hero-asset" />
                </section>
                <section>
                    <a href="#bottom">
                        <i className="fas fa-chevron-down"></i>
                    </a>
                </section>
            </div>

            <section id="bottom" className="card-container">
                <div>
                    <h1>{lang.home_latest_projects}</h1>
                    <Link to="/projects" className="btn-link">
                        {lang.generic_view_all}
                    </Link>
                </div>
                {projects.length > 0 ? (
                    <div>
                        {projects.map((project: any) => {
                            return (
                                <div key={project.slug} className="project-card">
                                    <img src={project.image_url} alt="project-logo" />
                                    <div>
                                        <h1>{project.name}</h1>
                                        <a href="/projects/<%= project.slug %>" className="btn-link">
                                            {lang.generic_read_more}
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <p>{lang.generic_nothing_to_see}</p>
                    </div>
                )}
            </section>
        </main>
    );
}
