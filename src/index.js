const { Router } = require("express");
const nodemailer = require("nodemailer");
const Turndown = require("turndown");
const marked = require("marked");

const knex = require("./config/knex");

const web = Router();

web.get("/", async (req, res) => {
    const service = new Turndown();
    function shorten(body) {
        const strLength = 450;
        return marked.parse(service.turndown(body).substring(0, strLength) + "...");
    }

    const projects = await knex("projects").orderBy("timestamp", "desc").limit(4);

    const blogPosts = await knex("blogs").whereNotNull("published_at").orderBy("updated_at", "desc").limit(4);

    return res.render("home", {
        title: req.i18n.title_home,
        projects: projects,
        blogPosts: blogPosts.map((el) => ({
            ...el,
            body: shorten(el.body),
        })),
        i18n: req.i18n,
    });
});

web.get("/about", async (req, res) => {
    return res.render("about", { title: req.i18n.title_about_me, i18n: req.i18n });
});

web.get("/projects", async (req, res) => {
    const projects = await knex("projects").orderBy("name", "asc");

    return res.render("projects", { title: req.i18n.title_projects, projects: projects, i18n: req.i18n });
});

web.get("/projects/:slug", async (req, res) => {
    try {
        const [project] = await knex("projects").select("name", "content", "timestamp", "id").where("slug", "=", req.params.slug);

        if (project) {
            return res.render("project", { title: project.name, project: project, i18n: req.i18n, cookies: req.cookies });
        } else {
            return res.render("404", { title: req.params.slug, i18n: req.i18n });
        }
    } catch (e) {
        return res.status(500).render("500", { title: req.i18n.title_server_error, i18n: req.i18n });
    }
});

web.get("/links", async (req, res) => {
    const links = await knex("social_links").orderBy("label", "asc");

    return res.render("links", { title: req.i18n.title_links, links, i18n: req.i18n });
});

web.get("/contact", (req, res) => {
    return res.render("contact", { title: req.i18n.title_contact, i18n: req.i18n });
});
web.post("/contact", async (req, res) => {
    const { name, email, content } = req.body;

    if (name && email && content) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: 25,
                secure: false,
                auth: {
                    user: process.env.MAIL_FROM,
                    pass: process.env.MAIL_PW,
                },
            });

            await transporter.sendMail({
                from: `Contactform <${process.env.MAIL_FROM}>`,
                to: process.env.MAIL_TO,
                subject: "Contactform Message",
                text: `${name} hat dir eine Nachricht über die Kontaktform zukommen lassen:\n\n${content}\n\nE-Mail: ${email}`,
            });

            await knex("sent_emails").insert({
                email,
            });

            return res.redirect(`/email-sent?email=${email}`);
        } catch (e) {
            return res.status(500).render("500", { title: req.i18n.title_server_error, i18n: req.i18n });
        }
    } else {
        return res.status(400).render("400", { title: req.i18n.title_bad_request, errMsg: req.i18n.error_missing_fields, i18n: req.i18n });
    }
});

web.get("/email-sent", (req, res) => {
    return res.render("emailSent", { title: req.i18n.title_email_sent, email: req.query.email ? req.query.email : null, i18n: req.i18n });
});

web.get("/about-page", (req, res) => {
    return res.render("pageSources", { title: req.i18n.title_page_resources, i18n: req.i18n });
});

web.get("/*", (req, res) => {
    return res.status(404).render("404", { title: req.i18n.title_not_found, i18n: req.i18n });
});

module.exports = web;
