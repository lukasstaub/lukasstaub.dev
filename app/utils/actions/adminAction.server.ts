import { compare } from "bcrypt";
import { json } from "remix";
import client from "../../config/client";
import { Actions } from "../actions";
import { removeCookie, userAuth } from "../cookies";
import { createAuthToken } from "../jwtHelpers";

export default async function (request: Request) {
    const bodyData = await request.formData();

    switch (bodyData.get("perform")) {
        case Actions.RESET_TOKEN: {
            return json(
                { done: true },
                {
                    headers: {
                        "Set-Cookie": removeCookie,
                    },
                }
            );
        }
        case Actions.REFRESH_TOKEN: {
            const userId = bodyData.get("userId");

            if (!userId)
                return json(
                    { success: false },
                    {
                        status: 400,
                    }
                );

            let token = createAuthToken(parseInt(userId as string));

            return json(
                { success: true },
                {
                    headers: {
                        "Set-Cookie": await userAuth.serialize({ token }),
                    },
                }
            );
        }
        case Actions.AUTHENTICATE: {
            const username = bodyData.get("username") as string | null;
            const password = bodyData.get("password") as string | null;

            if (!username || !password) return null;

            const user = await client.users.findFirst({ where: { username: username as string } });

            if (!user) return json({ error: "Credentials wrong!" }, { status: 400 });

            try {
                console.log(user.password, password.toString());
                const isMatching = await compare(password.toString(), user.password);

                if (!isMatching) return json({ error: "Credentials wrong!" }, { status: 400 });

                const token = createAuthToken(user.id);

                return json(
                    { success: true },
                    {
                        headers: {
                            "Set-Cookie": await userAuth.serialize({ token }),
                        },
                    }
                );
            } catch (e) {
                console.log(e);
                return null;
            }
        }
        default: {
            return new Response("Bad Request", {
                status: 400,
            });
        }
    }
}
