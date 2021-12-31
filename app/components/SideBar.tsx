import React, { useContext, useEffect, useState } from "react";
import { BackspaceIcon, CogIcon, CollectionIcon, FolderOpenIcon, HomeIcon, LogoutIcon, UserIcon } from "@heroicons/react/outline";
import { AuthContext } from "../routes/admin";
import SideBarElement from "./SideBarElement";

import info from "../../info.json";

function SideBar() {
    const context = useContext(AuthContext);

    const [currenttime, setCurrentTime] = useState(new Date().toLocaleString());
    useEffect(() => {
        setInterval(() => setCurrentTime(new Date().toLocaleString()), 1000);
    }, [currenttime]);

    return (
        <div className="w-[300px] flex-shrink-0 bg-gray-200 flex flex-col">
            <div className="p-2">
                <p className="text-sm text-gray-500">{currenttime}</p>
                <p className="text-lg">
                    Welcome, <b>{context.user?.name}</b>!
                </p>
            </div>
            <div className="flex-[6] pt-4">
                <SideBarElement link noHighlight href="/admin" icon={<HomeIcon />}>
                    Home
                </SideBarElement>
                <SideBarElement link href="/admin/media" icon={<FolderOpenIcon />}>
                    Media
                </SideBarElement>
                <SideBarElement link href="/admin/projects" icon={<CollectionIcon />}>
                    Projects
                </SideBarElement>
                <SideBarElement link href="/admin/config" icon={<CogIcon />}>
                    Config
                </SideBarElement>
            </div>
            <div className="flex-1 flex flex-col justify-end">
                <SideBarElement link href="/admin/profile" icon={<UserIcon />}>
                    Profile
                </SideBarElement>
                <SideBarElement a href="/" icon={<BackspaceIcon />}>
                    Leave
                </SideBarElement>
                <SideBarElement icon={<LogoutIcon />} onClick={() => context.logout()}>
                    Logout
                </SideBarElement>
                <SideBarElement hover={false}>
                    <p className="text-gray-600 text-sm">{info.version}</p>
                </SideBarElement>
            </div>
        </div>
    );
}

export default SideBar;
