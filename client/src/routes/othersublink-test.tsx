import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/othersublink-test")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/othersublink-test"!</div>;
}
