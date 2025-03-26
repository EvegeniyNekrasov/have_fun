import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
export const Route = createFileRoute("/vehicles/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex items-center gap-2">
            <span className="text-2xl">Vehicles</span>
            <Link to="/vehicles/$vehicleId" params={{ vehicleId: "6" }}>Some vehicle</Link>
        </div>
    );
}
