import { useRef } from "react";
import { useLineChart } from "@/hooks/charts/useLineChart";

const LineChartComponent = () => {
    const data = [242, 123, 54, 233, 21, 54, 662, 87, 45];
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useLineChart({ data, svgRef, containerRef });

    return (
        <div
            ref={containerRef}
            className="w-full h-full">
            <svg
                ref={svgRef}
                className="w-full h-full"
            />
        </div>
    );
};

export default LineChartComponent;
