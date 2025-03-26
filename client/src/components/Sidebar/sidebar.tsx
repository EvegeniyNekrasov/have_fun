import { sidebarLinks } from "@/components/Sidebar/sidebarLinks";
import { SidebarLinkItem, SidebarLinkProps } from "@/types/links";
import { Link, useLocation } from "@tanstack/react-router";
import { Fragment, ReactNode } from "react";

const SidebarLink = ({
    to,
    icon: Icon,
    title,
    isActive,
    className = "",
}: SidebarLinkProps): ReactNode => (
    <Link
        to={to}
        className={`flex items-center gap-2 ${isActive ? "text-blue-600" : ""} ${className}`}>
        {Icon && <Icon className="w-4 h-4" />}
        {title}
    </Link>
);

const Sidebar = () => {
    const { pathname } = useLocation();

    return (
        <nav className="bg-neutral-200 h-full w-full p-4 flex flex-col gap-2">
            <span className="text-xl font-bold">Logo</span>

            {sidebarLinks.map(
                (
                    { path, icon, title, sublinks }: SidebarLinkItem,
                    index: number
                ) => (
                    <Fragment key={`sidebar-link-${path}-${index}`}>
                        <SidebarLink
                            to={path}
                            icon={icon}
                            title={title}
                            isActive={pathname === path}
                        />

                        {sublinks && (
                            <div className="ml-6 flex flex-col gap-2">
                                {sublinks.map(
                                    (
                                        {
                                            path: subPath,
                                            icon: SubIcon,
                                            title: subTitle,
                                        }: SidebarLinkItem,
                                        subIndex: number
                                    ) => (
                                        <SidebarLink
                                            key={`sidebar-sublink-${subPath}-${subIndex}`}
                                            to={subPath}
                                            icon={SubIcon}
                                            title={subTitle}
                                            isActive={pathname === subPath}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </Fragment>
                )
            )}
        </nav>
    );
};

Sidebar.displayName = "Sidebar";

export default Sidebar;
