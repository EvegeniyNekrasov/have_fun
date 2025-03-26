import { SidebarLinkProps } from "@/types/links";
import { Link, ReactNode } from "@tanstack/react-router";

export const SidebarLink = ({
    to,
    icon: Icon,
    title,
    isActive,
    className = "",
}: SidebarLinkProps): ReactNode => (
    <Link
        to={to}
        className={`flex items-center gap-2 p-2 rounded ${isActive ? "text-blue-600 bg-blue-50" : ""} ${className}`}>
        {Icon && <Icon className="w-4 h-4" />}
        {title}
    </Link>
);
