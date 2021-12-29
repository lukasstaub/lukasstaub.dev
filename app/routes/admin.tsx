import React, { useEffect, createContext } from "react";
import { ActionFunction, LinksFunction, LoaderFunction, Outlet, useLoaderData } from "remix";
import Authenticate from "../components/Authenticate";
import getUser, { returnType } from "../utils/getUser";
import tailwindUrl from "../css/tailwind.css";
import { users } from "@prisma/client";
import { useState } from "react";
import adminActionServer from "../utils/actions/adminAction.server";
import { Actions } from "../utils/actions";
import SideBar from "../components/SideBar";

export const loader: LoaderFunction = async ({ request }) => {
    const user = await getUser(request);

    return user;
};

export const links: LinksFunction = () => {
    return [
        {
            rel: "stylesheet",
            href: tailwindUrl,
        },
    ];
};

export const action: ActionFunction = async ({ request }) => {
    return adminActionServer(request);
};

export const AuthContext = createContext<{ user: users | null; setUser: React.Dispatch<React.SetStateAction<users | null>> | null; logout: () => Promise<any> }>({
    setUser: null,
    user: null,
    logout: async () => {},
});

function AdminLayout() {
    const userInfo = useLoaderData<returnType>();

    const [user, setUser] = useState<users | null>(null);

    async function logout() {
        window.location.href = "/admin/logout";
    }

    useEffect(() => {
        // if (userInfo?.resetToken || userInfo?.refreshOnClient) {
        //     fetch("/admin", {
        //         method: "POST",
        //         body: JSON.stringify({
        //             perform: userInfo?.resetToken ? Actions.RESET_TOKEN : Actions.REFRESH_TOKEN,
        //             ...(userInfo.refreshOnClient ? { userId: userInfo.user.id } : {}),
        //         }),
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     });
        // }

        if (userInfo?.user) {
            setUser(userInfo.user);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {!userInfo || userInfo.resetToken ? (
                <Authenticate />
            ) : (
                <div className="h-full w-full flex max-h-full max-w-full">
                    <SideBar />
                    <Outlet />
                </div>
            )}
        </AuthContext.Provider>
    );
}

export default AdminLayout;
