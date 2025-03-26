import { SidebarLinkItems } from "@/types/links";
import { Home } from "lucide-react";

export const sidebarLinks: SidebarLinkItems[] = [
    {
        path: "/",
        title: "Home",
        icon: Home,
    },
    {
        path: "/test",
        title: "Test",
        icon: Home,
        sublinks: [
            { path: "/othersublink-test", title: "Other Sublink", icon: Home },
            { path: "/sublink-test", title: "Sublink" },
        ],
    },
];
