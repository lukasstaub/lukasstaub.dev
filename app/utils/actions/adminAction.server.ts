import { compare } from "bcrypt";
import { json, redirect } from "remix";
import client from "../../config/client";
import { Actions } from "../actions";
import { userAuth } from "../cookies";
import { createAuthToken } from "../jwtHelpers";

export default async function (request: Request) {
    const bodyData = await request.formData();

    if (bodyData.get("perform") === Actions.RESET_TOKEN) {
        return json(
            { done: true },
            {
                // headers: {
                //     "Set-Cookie": await expireAuth.serialize({}),
                // },
            }
        );
    } else if (bodyData.get("perform") === Actions.REFRESH_TOKEN) {
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

    if (bodyData.get("perform") !== Actions.AUTHENTICATE) return json({ error: "Wrong request type!" }, { status: 400 });

    const username = bodyData.get("username");
    const password = bodyData.get("password");

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
