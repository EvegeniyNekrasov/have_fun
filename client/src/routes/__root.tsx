import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
    component: Index,
});

function Index() {
    return (
        <>
            <div>
                <Link to="/">Home</Link>
                <Link to="/test">Test</Link>
            </div>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    );
}
