import { createFileRoute } from "@tanstack/react-router";
import "./index.css";
import Container from "@/ui/container";
import BarChartComponent from "@/components/BarChartComponent";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <div className="w-full h-full p-4 gap-2 flex flex-col">
            <span className="text-xl text-blue-600 font-bold">
                Welcome to [companyname]
            </span>
            <div className="grid grid-cols-2 gap-4 w-full flex-1 min-h-0">
                <Container size="xl">
                    <span className="shrink-0">asldlkdsa</span>
                    <BarChartComponent />
                </Container>
                <Container size="xl">
                    <span className="shrink-0">asldlkdsa</span>
                    <BarChartComponent />
                </Container>
                <Container size="xl">
                    <span className="shrink-0">asldlkdsa</span>
                    <BarChartComponent />
                </Container>
                <Container size="xl">
                    <span className="shrink-0">asldlkdsa</span>
                    <BarChartComponent />
                </Container>
            </div>
        </div>
    );
}
