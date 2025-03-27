import { SidebarLinkProps } from "@/types/links";
import Tooltip from "@/ui/tooltip";
import { Link, ReactNode } from "@tanstack/react-router";

export const SidebarLink = ({
    to,
    icon: Icon,
    title,
    isActive,
    tooltip = false,
    className = "",
}: SidebarLinkProps): ReactNode => (
    <Link
        to={to}
        className={`flex items-center text-xs gap-2 px-4 py-3 rounded relative
            ${!tooltip ? "w-[40px] h-[40px]" : ""}
            ${
                isActive
                    ? " bg-blue-50 text-blue-600 before:absolute before:left-0 before:w-1 before:h-[20px] before:bg-blue-600 before:rounded"
                    : ""
            } ${className}`}>
        {Icon &&
            (!tooltip ? (
                <Tooltip
                    content={title}
                    position="right">
                    {<Icon className="w-4 h-4" />}
                </Tooltip>
            ) : (
                <Icon className="w-4 h-4" />
            ))}
        {tooltip ? title : null}
    </Link>
);
