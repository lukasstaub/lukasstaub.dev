import React from "react";
import { Link } from "remix";

const SideBarElement: React.FC<{ icon?: React.ReactNode; onClick?: () => void; link?: boolean; href?: string }> = ({ children, icon, href, link, onClick }) => {
    return link ? (
        <Link to={href!} className="p-2 hover:bg-gray-300 flex items-center text-lg cursor-pointer" onClick={onClick}>
            {icon && <div className="mr-2 w-[20px]">{icon}</div>}

            {children}
        </Link>
    ) : (
        <div className="p-2 hover:bg-gray-300 flex items-center text-lg cursor-pointer" onClick={onClick}>
            {icon && <div className="mr-2 w-[20px]">{icon}</div>}

            {children}
        </div>
    );
};

export default SideBarElement;
