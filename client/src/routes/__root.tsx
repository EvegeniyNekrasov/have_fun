import Sidebar from "@/components/Sidebar/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
    component: Index,
});

function Index() {
    return (
        <div className="w-full h-screen flex gap-0 bg-white">
            <Sidebar />
            <div className="h-full w-full bg-neutral-100">
                <Outlet />
                {/* <TanStackRouterDevtools /> */}
            </div>
        </div>
    );
}
