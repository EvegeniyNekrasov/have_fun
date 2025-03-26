import { Home } from "lucide-react";

interface Link {
    path: string;
    title: string;
    subpath?: Link[];
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const sidebarLinks: Link[] = [
    {
        path: "/",
        title: "Home",
        icon: Home,
    },
    {
        path: "/test",
        title: "Test",
        icon: Home,
    },
];
