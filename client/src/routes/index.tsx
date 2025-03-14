import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Button from "../ui/Button/button";

import "./index.css";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div>
            <Button
                loading={isLoading}
                spinnerPlacement="end">
                This is my button
            </Button>
            <Button onClick={() => setIsLoading(!isLoading)}>
                Toggle loading state
            </Button>
        </div>
    );
}
