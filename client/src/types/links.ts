export interface SidebarLinkItems {
    path: string;
    title: string;
    sublinks?: SidebarLinkItems[];
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface SidebarLinkItem {
    path: string;
    title: string;
    icon?: React.ComponentType<{ className?: string }>;
    sublinks?: SidebarLinkItem[];
}

export interface SidebarLinkProps {
    to: string;
    icon?: React.ComponentType<{ className?: string }>;
    title: string;
    isActive: boolean;
    tooltip?: boolean;
    className?: string;
}
