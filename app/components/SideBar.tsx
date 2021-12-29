import React, { useContext, useEffect, useState } from "react";
import { LogoutIcon } from "@heroicons/react/outline";
import { AuthContext } from "../routes/admin";
import SideBarElement from "./SideBarElement";

function SideBar() {
    const context = useContext(AuthContext);

    const [currenttime, setCurrentTime] = useState(new Date().toLocaleString());
    useEffect(() => {
        setInterval(() => setCurrentTime(new Date().toLocaleString()), 1000);
    }, [currenttime]);

    return (
        <div className="w-[300px] bg-gray-200 flex flex-col">
            <div className="p-2">
                <p className="text-sm text-gray-500">{currenttime}</p>
                <p className="text-lg">
                    Welcome, <b>@{context.user?.username}</b>!
                </p>
            </div>
            <div className="flex-[6]"></div>
            <div className="flex-1 flex flex-col justify-end">
                <SideBarElement icon={<LogoutIcon />} onClick={() => context.logout()}>
                    Logout
                </SideBarElement>
            </div>
        </div>
    );
}

export default SideBar;
