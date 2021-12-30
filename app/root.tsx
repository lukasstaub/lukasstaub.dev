import { useState } from "react";
import { Link, Links, LinksFunction, LiveReload, LoaderFunction, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData } from "remix";

import contentStylesUrl from "./css/content-styles.css";
import stylesUrl from "./css/index.css";
import getLang from "./utils/getLang";
import getUser, { returnType } from "./utils/getUser";
import en from "./utils/lang/en";

export const loader: LoaderFunction = async ({ request }) => {
    const lang = getLang(request);

    const admin = request.url.includes("/admin");

    const user = await getUser(request);

    return { lang, admin, user };
};

export const links: LinksFunction = () => {
    return [
        {
            rel: "stylesheet",
            href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css",
            integrity: "sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==",
            crossOrigin: "anonymous",
        },
        {
            rel: "stylesheet",
            href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/brands.min.css",
            integrity: "sha512-apX8rFN/KxJW8rniQbkvzrshQ3KvyEH+4szT3Sno5svdr6E/CP0QE862yEeLBMUnCqLko8QaugGkzvWS7uNfFQ==",
            crossOrigin: "anonymous",
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap",
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
        },
        {
            rel: "apple-touch-icon",
            href: "/assets/logo192.png",
        },
        {
            rel: "icon",
            href: "/assets/favicon.ico",
        },
    ];
};

export default function App() {
    const { lang, admin, user } = useLoaderData<{ lang: typeof en; admin: boolean; user: returnType }>();

    const [menuShown, setMenuShown] = useState(false);

    const toggleMenu = () => {
        setMenuShown((state) => !state);
    };

    return (
        <html lang={lang.lang} className="h-full w-full">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />

                <Meta />
                <Links />

                {!admin && (
                    <>
                        <link rel="stylesheet" href={stylesUrl} />
                        <link rel="stylesheet" href={contentStylesUrl} />
                    </>
                )}
            </head>
            <body className="h-full w-full">
                {admin ? (
                    <Outlet />
                ) : (
                    <>
                        <header>
                            <Link to="/" className="page-title">
                                lukasstaub.dev
                            </Link>

                            <section className="mobile-hidden">
                                <Link to="/about">{lang.nav_about}</Link>
                                <Link to="/contact">{lang.nav_contact}</Link>
                                <Link to="/projects">{lang.nav_projects}</Link>
                                <Link to="/links">{lang.nav_links}</Link>
                            </section>

                            {!menuShown ? <i onClick={toggleMenu} id="show-menu" className="fas fa-bars desktop-hidden hamburger-btn"></i> : <i onClick={toggleMenu} id="close-menu" className="fas fa-times hamburger-btn"></i>}
                        </header>
                        <div className="content">
                            <Outlet />
                        </div>
                        <footer>
                            <p>Copyright &copy;{new Date().getFullYear()} Lukas Staub.</p>
                            <section>
                                <a href="/admin">{Boolean(user?.user?.id) ? "Admin Panel" : lang.footer_login}</a>
                                <Link to="/about-page">{lang.footer_page_resources}</Link>
                            </section>
                        </footer>

                        <div className={`mobile-menu ${menuShown ? "shown" : null}`} id="mobile-menu">
                            <Link className="btn" to="/about" onClick={toggleMenu}>
                                {lang.nav_about}
                            </Link>
                            <Link className="btn" to="/contact" onClick={toggleMenu}>
                                {lang.nav_contact}
                            </Link>
                            <Link className="btn" to="/projects" onClick={toggleMenu}>
                                {lang.nav_projects}
                            </Link>
                            <Link className="btn" to="/links" onClick={toggleMenu}>
                                {lang.nav_links}
                            </Link>
                        </div>
                    </>
                )}
                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === "development" && <LiveReload />}
            </body>
        </html>
    );
}

export function CatchBoundary() {
    const caught = useCatch();

    return (
        <html>
            <head>
                <title>
                    {caught.status} - {caught.statusText}
                </title>
                <Links />
                <link rel="stylesheet" href={stylesUrl} />
            </head>
            <body>
                {caught.status === 404 ? (
                    <main className="error-main">
                        <img src="/assets/404-illustration.svg" alt="404" />
                        <h2>
                            {caught.status} - {caught.statusText}
                        </h2>
                    </main>
                ) : caught.status === 400 ? (
                    <main className="error-main">
                        <img src="/assets/400-illustration.svg" alt="400" />
                        <h2>{caught.data}</h2>
                    </main>
                ) : null}
                <Scripts />
            </body>
        </html>
    );
}
