import { LoaderFunction, redirect } from "remix";
import { removeCookie } from "../../utils/cookies";

export const loader: LoaderFunction = async () => {
    return redirect("/admin", {
        headers: {
            "Set-Cookie": removeCookie,
        },
    });
};
