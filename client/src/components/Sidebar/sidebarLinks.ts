import { SidebarLinkItems } from "@/types/links";
import { Home, Truck, SquareUserRound, LayoutDashboard } from "lucide-react";

export const sidebarLinks: SidebarLinkItems[] = [
    {
        path: "/",
        title: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        path: "/vehicles",
        title: "Vehicles",
        icon: Truck,
    },
    {
        path: "/drivers",
        title: "Drivers",
        icon: SquareUserRound,
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
