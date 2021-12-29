import de from "./lang/de";
import en from "./lang/en";

export default function (req: Request): typeof en {
    const lang = req.headers.get("accept-language")?.split(",")[0];

    if (lang?.includes("de-")) {
        return de;
    } else {
        return en;
    }
}
