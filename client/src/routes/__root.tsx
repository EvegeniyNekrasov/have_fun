import Sidebar from "@/components/Sidebar/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
    component: Index,
});

function Index() {
    return (
        <div className="w-full h-screen grid grid-cols-[250px_1fr] bg-white">
            <Sidebar />
            <div className="h-full">
                <Outlet />
                <TanStackRouterDevtools />
            </div>
        </div>
    );
}
