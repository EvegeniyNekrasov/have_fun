import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vehicles/$vehicleId")({
    component: RouteComponent,
});

function RouteComponent() {
    const vehicleId = Route.useParams().vehicleId;
    return <div>You are looking at {vehicleId} vehicle</div>;
}
