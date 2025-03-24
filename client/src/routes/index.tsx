import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Button from "@/ui/button";
import useGetTransporte from "@/hooks/transportes/useGetTransportes";
import "./index.css";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const [isLoading, setIsLoading] = useState(false);
    const { data, isFetching } = useGetTransporte();

    if (isFetching) return <span>Is fetching...</span>;
    if (data) console.log(data);

    return (
        <div className="w-full">
            <Button
                size="sm"
                loading={isLoading}
                onClick={() => console.log("click")}
                spinnerPlacement="end">
                This is my button
            </Button>
            <Button onClick={() => setIsLoading(!isLoading)}>
                Toggle loading state
            </Button>
        </div>
    );
}
