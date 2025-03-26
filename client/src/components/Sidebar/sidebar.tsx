import { Fragment, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "@tanstack/react-router";

import SearchComponent from "@/components/Search/search-component";
import { SidebarLink } from "@/components/Sidebar/sidebar-link";
import { sidebarLinks } from "@/components/Sidebar/sidebarLinks";

import { SidebarLinkItem } from "@/types/links";
import Tooltip from "@/ui/tooltip";
import { SidebarUtil } from "@/utils/sidebar";

const Sidebar = () => {
    const { pathname } = useLocation();
    const [search, setSearch] = useState("");

    const [isExpanded, setIsExpanded] = useState(true);

    const isLinkActive = (linkPath: string): boolean => {
        if (linkPath === "/") return pathname === "/";
        return pathname === linkPath || pathname.startsWith(linkPath + "/");
    };

    const toggleSidebar = () => {
        setIsExpanded((prev) => !prev);
    };

    useEffect(() => {
        window.addEventListener("keydown", (e) =>
            SidebarUtil.toggleSidebarOnShortcut(e, toggleSidebar)
        );
        return () =>
            window.removeEventListener("keydown", (e) =>
                SidebarUtil.toggleSidebarOnShortcut(e, toggleSidebar)
            );
    }, []);

    return (
        <nav
            className={`bg-white h-full relative flex flex-col gap-2 p-4 transition-all duration-300 ease-in-out
                ${isExpanded ? "w-[250px]" : "w-[60px] overflow-hidden"}`}>
            <div className="flex items-center justify-between">
                <span
                    className={`text-xl font-bold transition-opacity ${isExpanded ? "opacity-100" : "opacity-0"}`}>
                    Logo
                </span>
            </div>

            {isExpanded && (
                <SearchComponent
                    search={search}
                    setSearch={setSearch}
                />
            )}

            <div className="absolute right-4 top-4  w-[26px] h-[26px] bg-blue-50 flex justify-center items-center z-10 shadow">
                <Tooltip content="Press Ctrl + b to toggle">
                    <button
                        onClick={toggleSidebar}
                        className="cursor-pointer">
                        {isExpanded ? (
                            <ChevronLeft size={18} />
                        ) : (
                            <ChevronRight size={18} />
                        )}
                    </button>
                </Tooltip>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto">
                {sidebarLinks.map(
                    (
                        { path, icon, title, sublinks }: SidebarLinkItem,
                        index: number
                    ) => (
                        <Fragment key={`sidebar-link-${path}-${index}`}>
                            <SidebarLink
                                to={path}
                                icon={icon}
                                title={isExpanded ? title : ""}
                                isActive={isLinkActive(path)}
                                className={!isExpanded ? "justify-center" : ""}
                            />

                            {isExpanded && sublinks && (
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
                                                isActive={isLinkActive(subPath)}
                                            />
                                        )
                                    )}
                                </div>
                            )}
                        </Fragment>
                    )
                )}
            </div>
        </nav>
    );
};

Sidebar.displayName = "Sidebar";

export default Sidebar;
