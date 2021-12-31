import React from "react";
import { Link, NavLink } from "remix";

const SideBarElement: React.FC<{ icon?: React.ReactNode; onClick?: () => void; link?: boolean; href?: string; a?: boolean; noHighlight?: boolean; hover?: boolean }> = ({ children, icon, href, link, onClick, a, noHighlight, hover = true }) => {
    const Content = () => {
        return (
            <>
                {icon && <div className="mr-2 w-[20px]">{icon}</div>}

                {children}
            </>
        );
    };

    return a ? (
        <a href={href!} className={`p-2 ${hover && "hover:bg-gray-300 cursor-pointer"} flex items-center text-lg`} onClick={onClick}>
            <Content />
        </a>
    ) : link ? (
        <NavLink to={href!} className={({ isActive }) => `p-2 ${hover && "hover:bg-gray-300 cursor-pointer"} ${isActive && !noHighlight ? "bg-gray-300" : ""} flex items-center text-lg`} onClick={onClick}>
            <Content />
        </NavLink>
    ) : (
        <div className={`p-2 ${hover && "hover:bg-gray-300 cursor-pointer"} flex items-center text-lg`} onClick={onClick}>
            <Content />
        </div>
    );
};

export default SideBarElement;
