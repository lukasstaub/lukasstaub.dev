function AboutPage() {
    return (
        <main className="page-resources-container">
            <img src="/assets/info.svg" alt="info illustration" />
            <section className="contents">
                <h1>About this page</h1>
                <br />
                <h2>This page has been designed with love by Lukas Staub in Germany.</h2>
                <b>
                    Powered by{" "}
                    <a href="https://www.vercel.com" target="_blank">
                        Vercel
                    </a>
                </b>
                <br />
                <br />
                <h3>Used libraries:</h3>
                <ul>
                    <li>
                        <a href="https://remix.run/" target="_blank">
                            Remix
                        </a>
                    </li>
                    <li>
                        <a href="https://reactjs.org/" target="_blank">
                            React
                        </a>
                    </li>
                    <li>
                        <a href="https://www.npmjs.com/package/nodemailer" target="_blank">
                            nodemailer
                        </a>
                    </li>
                    <li>
                        <a href="https://sass-lang.com/" target="_blank">
                            Sass
                        </a>
                    </li>
                    <li>
                        <a href="https://tailwindcss.com/" target="_blank">
                            Tailwind
                        </a>
                    </li>
                </ul>
                <br />
                <br />
                <h3>Used sources:</h3>
                <ul>
                    <li>
                        <a href="https://undraw.co/" target="_blank">
                            undraw
                        </a>{" "}
                        (illustrations)
                    </li>
                </ul>
            </section>
        </main>
    );
}

export default AboutPage;
