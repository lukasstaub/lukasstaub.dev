module.exports = {
    lang: "de",

    about_me: `
        <h2>Hallo!</h2>
        <br />
        <h4>Ich bin Lukas Staub, ein Web-Entwickler aus Deutschland.</h4>
        <br />
        <p>
            Meine grundlegenden Programmierinteressen und Kenntnisse sind im Bereich von Node.js, JavaScript, HTML, CSS und ReactJS. Mein Ziel ist es, wunderschöne, skalierbare und fantastische Anwendungen zu erschaffen,
            <br />
            wobei mein Fokus auf einer intuitiven und fantastischen Benutzererfahrung liegt.
            <br />
            Meiner Meinung nach, ist der Benutzer der absolute Mittelpunkt jeder modernen Web-Anwendung, da diese unbedingt einfach und zugänglich für jeden sein sollten.
        </p>
        <br />
        <p>Es ist mir nicht nur möglich wunderschöne Web-Erfahrungen zu erschaffen, sondern auch Mobil-Erfahrungen in Form von Nativen Apps mit der Hilfe von React Native.</p>
        <br />
        <p>Bitte sehen Sie sich meine <a href="/projects">Projekte</a> für mehr Informationen zu dem an, woran ich momentan arbeite.</p>
        <br />
        <p>Falls Sie irgendwelche Fragen oder Interessen an meiner Arbeit haben, scheuen Sie sich nicht mit mir über meine my <a href="/contact">Kontaktseite</a> in Kontakt zu treten.</p>
    `,
    welcome_meta: "Willkomen auf der Portfolio-Seite von Lukas Staub!",

    //navbar
    nav_about: "Über mich",
    nav_contact: "Kontakt",
    nav_projects: "Projekte",
    nav_links: "Links",
    nav_blog: "Blog",

    //footer
    footer_login: "Anmelden",
    footer_page_resources: "Seitenquellen",

    //titles
    title_about_me: "Über mich",
    title_home: "Home",
    title_projects: "Projekte",
    title_server_error: "Server Fehler",
    title_links: "Links",
    title_contact: "Kontakt",
    title_bad_request: "Bad Request",
    title_email_sent: "E-Mail gesendet",
    title_page_resources: "Seitenquellen",
    title_not_found: "Nicht gefunden",
    title_servicing: "Wartung",

    //errors
    error_missing_fields: "Haben Sie alle Felder ausgefüllt?",
    error_not_found: "Wir konnten die von Ihnen gesuchte Seite leider nicht finden",
    error_internal_server: "Ein Interner Serverfehler ist aufgetreten",

    //contact
    contact_body: "Was möchten Sie mir mitteilen?",
    contact_email_sent: (email) => `Danke, dass Sie sich bei mir gemeldet haben!\nIch werde mich bei Ihnen unter ${email} melden.\nEinen schönen Tag Ihnen noch!`,

    //generic
    generic_name: "Name",
    generic_email: "E-Mail",
    generic_send: "Senden",
    generic_read_more: "Mehr erfahren",
    generic_view_all: "Alle ansehen",
    generic_nothing_to_see: "Hier ist momentan nichts zu sehen",
    generic_edit: "Bearbeiten",
    generic_site_maintenance: "Momentan wird diese Seite gewartet.\nBitte kommen Sie zu einem späteren Zeitpunkt zurück.",

    //projects
    projects_not_found: "No Projects found",
    projects_last_updated: (on, at) => `Last updated on ${on} at ${at}`,

    //home
    home_top: "Hallo,",
    home_middle: "Ich bin Lukas",
    home_bottom_one: "Ich bin ein Web-Entwickler",
    home_bottom_two: "und UI/UX Designer aus Deutschland.",
    home_latest_projects: "Neuste Projekte:",
    home_latest_blogposts: "Neuste Blogbeiträge:",
};
