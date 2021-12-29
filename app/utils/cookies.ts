import { createCookie } from "remix";
import constants from "./constants";

export const AUTH_NAME = "admin-area-access-cookie";

export const userAuth = createCookie(AUTH_NAME, {
    httpOnly: true,
    expires: new Date(Date.now() + constants.dayInMs * 365),
    secure: process.env.NODE_ENV === "production",
});
