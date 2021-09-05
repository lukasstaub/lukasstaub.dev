"use strict";

require("dotenv").config();

const layouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const path = require("path");

const web = require("./src/index");
const knex = require("./src/config/knex");

const en = require("./src/lang/en");
const de = require("./src/lang/de");

const port = process.env.PORT || 5000;

const app = express();
app.set("trust proxy", true);
app.set("view engine", "ejs");

// static files
app.use("/assets", express.static(path.join(__dirname, "./public/assets")));
app.use("/css", express.static(path.join(__dirname, "./public/css")));
app.use("/js", express.static(path.join(__dirname, "./public/js")));
// end of static files

app.use((req, _, next) => {
    const langs = req.acceptsLanguages();

    if (langs[0].toLocaleLowerCase().includes("de")) {
        req.i18n = { ...en, ...de };
    } else {
        req.i18n = en;
    }

    return next();
});

app.use(async (req, _, next) => {
    const data = await knex("website_config");

    const config = {};

    data.map((el) => {
        config[el.name] = el.value;
    });

    req.config = config;

    return next();
});

app.use((req, res, next) => {
    if (req.config.main_maintenance && process.env.NODE_ENV === "production") return res.render("servicing", { i18n: req.i18n });

    return next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
    })
);
app.use(layouts);

app.use(async (req, _, next) => {
    if (process.env.NODE_ENV === "production") {
        await knex("access_logs").insert({
            user_agent: req.headers["user-agent"],
            page_name: process.env.PAGE_NAME,
            method: req.method,
        });
    }

    return next();
});

app.use("/", web);

app.listen(port, () => {
    console.log("Server running on https://localhost:" + port);
});
