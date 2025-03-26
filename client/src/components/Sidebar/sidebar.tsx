import { sidebarLinks } from "@/components/Sidebar/sidebarLinks";
import { Link, useLocation } from "@tanstack/react-router";

const Sidebar = () => {
    const location = useLocation();

    return (
        <nav className="bg-neutral-200 h-full w-full p-4 flex flex-col gap-2">
            <span className="text-xl font-bold">Logo</span>
            {sidebarLinks.map((link) => (
                <Link
                    to={link.path}
                    key={link.title}
                    className={`flex items-center gap-2 ${location.pathname === link.path ? "text-blue-600" : ""}`}>
                    {link.icon ? <link.icon className="w-4 h-4" /> : null}
                    {link.title}
                </Link>
            ))}
        </nav>
    );
};

Sidebar.displayName = "Sidebar";

export default Sidebar;
