import { useEffect } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import client from "~/config/client";

export const loader: LoaderFunction = async () => {
    const projects = await client.projects.findMany();

    return projects;
};

export default function Index() {
    const projects = useLoaderData();

    useEffect(() => {
        console.log(projects);
    }, []);

    return (
        <main className="home-content">
            <div className="home-inner-top">
                <section className="message">
                    <p className="top">i18n.home_top</p>
                    <p className="big">i18n.home_middle</p>
                    <p className="bottom">
                        i18n.home_bottom_one
                        <br />
                        i18n.home_bottom_two
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
                    <h1>i18n.home_latest_projects</h1>
                    <a href="/projects" className="btn-link">
                        i18n.generic_view_all
                    </a>
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
                                            i18n.generic_read_more
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <p>i18n.generic_nothing_to_see</p>
                    </div>
                )}
            </section>
        </main>
    );
}
