import { Links, LinksFunction, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "remix";
import type { MetaFunction } from "remix";

import contentStylesUrl from "./css/content-styles.css";
import stylesUrl from "./css/index.css";

export const meta: MetaFunction = () => {
    return { title: "New Remix App" };
};

export const links: LinksFunction = () => {
    return [
        {
            rel: "stylesheet",
            href: stylesUrl,
        },
        {
            rel: "stylesheet",
            href: contentStylesUrl,
        },
    ];
};

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossOrigin="anonymous" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/brands.min.css" integrity="sha512-apX8rFN/KxJW8rniQbkvzrshQ3KvyEH+4szT3Sno5svdr6E/CP0QE862yEeLBMUnCqLko8QaugGkzvWS7uNfFQ==" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="apple-touch-icon" href="/assets/logo192.png" />
                <link rel="icon" href="/assets/favicon.ico" />

                <Meta />
                <Links />
            </head>
            <body>
                <header>
                    <a href="/" className="page-title">
                        lukasstaub.dev
                    </a>

                    <section className="mobile-hidden">
                        <a href="/about">i18n.nav_about</a>
                        <a href="/contact">i18n.nav_contact</a>
                        <a href="/projects">i18n.nav_projects</a>
                        <a href="/links">i18n.nav_links</a>
                    </section>

                    <i id="show-menu" className="fas fa-bars desktop-hidden hamburger-btn"></i>
                    <i id="close-menu" className="fas fa-times hamburger-btn hidden"></i>
                </header>
                <div className="content">
                    <Outlet />
                </div>
                <footer>
                    <p>Copyright &copy;{new Date().getFullYear()} Lukas Staub.</p>
                    <section>
                        <a href="https://admin.lukasstaub.dev" target="_blank">
                            i18n.footer_login
                        </a>
                        <a href="/about-page">i18n.footer_page_resources</a>
                    </section>
                </footer>

                <div className="mobile-menu" id="mobile-menu">
                    <a className="btn" href="/about">
                        i18n.nav_about
                    </a>
                    <a className="btn" href="/contact">
                        i18n.nav_contact
                    </a>
                    <a className="btn" href="/projects">
                        i18n.nav_projects
                    </a>
                    <a className="btn" href="/links">
                        i18n.nav_links
                    </a>
                </div>
                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === "development" && <LiveReload />}
            </body>
        </html>
    );
}
