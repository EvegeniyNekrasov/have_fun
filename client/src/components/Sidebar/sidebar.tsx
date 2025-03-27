import { Fragment, useEffect, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useLocation } from "@tanstack/react-router";

import SearchComponent from "@/components/Search/search-component";
import { SidebarLink } from "@/components/Sidebar/sidebar-link";
import { sidebarLinks } from "@/components/Sidebar/sidebarLinks";

import { SidebarLinkItem } from "@/types/links";
import { SidebarUtil } from "@/utils/sidebar";

const Sidebar = () => {
    const { pathname } = useLocation();
    const [search, setSearch] = useState("");
    const [time, setTime] = useState(new Date());
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const dateFormat = time.toLocaleDateString("en-EN", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const hourFormat = time.toLocaleTimeString("en-EN");

    const isLinkActive = (linkPath: string): boolean => {
        if (linkPath === "/") return pathname === "/";
        return pathname === linkPath || pathname.startsWith(linkPath + "/");
    };

    const toggleSidebar = () => {
        setIsExpanded((prev) => {
            const newExpanded = !prev;
            localStorage.setItem(
                "sidebar",
                JSON.stringify({ expanded: newExpanded })
            );
            return newExpanded;
        });
    };

    useEffect(() => {
        const storageData = localStorage.getItem("sidebar");
        if (storageData) {
            const data = JSON.parse(storageData);
            const { expanded } = data;
            setIsExpanded(expanded);
        }
    }, []);

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
            className={`bg-white h-full border border-r-1 border-neutral-200 relative flex flex-col gap-2 p-4 transition-all duration-300 ease-in-out overflow-hidden
                ${isExpanded ? "w-[250px]" : "w-fit items-center "}`}>
            {isExpanded ? (
                <span className="text-xs text-neutral-500">
                    Crtl + b to toggle sidebar
                </span>
            ) : null}
            {isExpanded ? (
                <div className="flex items-center justify-between">
                    <span className={`text-xl font-bold`}>Logo</span>
                </div>
            ) : null}

            {!isExpanded ? <div className="w-[30px] h-[30px] "></div> : null}

            {isExpanded && (
                <SearchComponent
                    search={search}
                    setSearch={setSearch}
                />
            )}

            <div
                className={`absolute ${isExpanded ? "right-4" : "right-5.5"} top-2.5  w-[26px] h-[26px] bg-blue-50 flex justify-center items-center z-50 shadow`}>
                <button
                    onClick={toggleSidebar}
                    className="cursor-pointer">
                    {isExpanded ? (
                        <ChevronLeft size={18} />
                    ) : (
                        <ChevronRight size={18} />
                    )}
                </button>
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
                                title={title}
                                isActive={isLinkActive(path)}
                                tooltip={isExpanded}
                                className={!isExpanded ? "justify-center" : ""}
                            />

                            {isExpanded && sublinks && (
                                <div className="pl-4 flex flex-col gap-2">
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
                                                tooltip={isExpanded}
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
            {isExpanded ? (
                <div className="mt-auto bg-blue-50 p-2 rounded text-xs flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <Calendar size={12} />
                        <span>{dateFormat}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={12} />
                        <span>{hourFormat}</span>
                    </div>
                </div>
            ) : null}
        </nav>
    );
};

Sidebar.displayName = "Sidebar";

export default Sidebar;
