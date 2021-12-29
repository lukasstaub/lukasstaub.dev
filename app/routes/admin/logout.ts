import { LoaderFunction, redirect } from "remix";
import { AUTH_NAME } from "../../utils/cookies";

export const loader: LoaderFunction = async () => {
    return redirect("/admin", {
        headers: {
            "Set-Cookie": `${AUTH_NAME}=;Expires=${new Date(Date.now() - 60 * 60 * 24 * 1000 * 3)};Path=/;HttpOnly=true`,
        },
    });
};
