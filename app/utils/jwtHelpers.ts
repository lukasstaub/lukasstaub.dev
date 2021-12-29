import jwt from "jsonwebtoken";

type tokenPayload = {
    exp: number;
    userId: number;
};

export const createAuthToken = (userId: number) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: 60 * 60 * 24 * 200, //200 days
    });

    return token;
};

export const verifyToken: (token: string) => tokenPayload | null = (token: string) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);

        return payload as tokenPayload;
    } catch (e) {
        return null;
    }
};

export const willExpireIn: (time: number, tokenPayload: tokenPayload) => boolean = (time, tokenPayload) => {
    return tokenPayload.exp - Date.now() <= time;
};
