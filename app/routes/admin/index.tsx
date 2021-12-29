import { Links, LinksFunction } from "remix";
import tailwindUrl from "../../css/tailwind.css";

export const links: LinksFunction = () => {
    return [
        {
            rel: "stylesheet",
            href: tailwindUrl,
        },
    ];
};

function Admin() {
    return (
        <html>
            <head>
                <Links />
            </head>
            <body>
                <main className="bg-green-500">Hello world!</main>
            </body>
        </html>
    );
}

export default Admin;
