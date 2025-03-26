import { sidebarLinks } from "@/components/Sidebar/sidebarLinks";
import { SidebarLinkItem, SidebarLinkProps } from "@/types/links";
import Tooltip from "@/ui/tooltip";
import { Link, useLocation } from "@tanstack/react-router";
import { Eraser, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment, ReactNode, useEffect, useState } from "react";

const SidebarLink = ({
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

type SearchComponentProps = {
    search: string;
    setSearch: (value: string) => void;
};

const SearchComponent = ({ search, setSearch }: SearchComponentProps) => (
    <div className="flex bg-neutral-50 rounded-md items-center gap-1 flex-row p-2 w-full">
        <Search size={18} />
        <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full h-full active:border-none focus-within:outline-none"
        />
        <button
            onClick={() => setSearch("")}
            className="w-[25px] h-[20px] cursor-pointer rounded flex items-center justify-center bg-white">
            <Eraser size={14} />
        </button>
    </div>
);
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
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "b"
            ) {
                event.preventDefault();
                toggleSidebar();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
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
