import { users } from "@prisma/client";
import client from "../config/client.server";
import constants from "./constants";
import { userAuth } from "./cookies";
import { verifyToken, willExpireIn } from "./jwtHelpers";

export type returnType =
    | {
          resetToken: boolean;
          refreshOnClient?: undefined;
          user?: undefined;
      }
    | {
          refreshOnClient: boolean;
          user: users;
          resetToken?: undefined;
      }
    | null;

export default async function (req: Request) {
    let refreshOnClient = false;
    const cookieHeader = req.headers.get("Cookie");
    const cookie = (await userAuth.parse(cookieHeader)) || {};

    if (!cookie.token) return null;

    const verified = verifyToken(cookie.token);

    if (!verified) return { resetToken: true };

    if (willExpireIn(constants.dayInMs * 30, verified)) refreshOnClient = true;

    const user = await client.users.findUnique({ where: { id: verified.userId } });

    if (!user) return { resetToken: true };

    const { password, ...userData } = user;

    return {
        refreshOnClient,
        user: userData,
    };
}
