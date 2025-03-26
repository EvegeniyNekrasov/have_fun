import { createFileRoute } from "@tanstack/react-router";
import "./index.css";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <div className="w-full">
            <span>This is a home page</span>
        </div>
    );
}
