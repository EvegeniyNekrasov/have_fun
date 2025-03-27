import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChartComponent = () => {
    const ref = useRef<SVGSVGElement>(null);
    const data = [123, 312, 123, 321, 123];

    useEffect(() => {
        if (ref.current) {
            d3.select(ref.current).selectAll("*").remove();
            const svg = d3
                .select(ref.current)
                .attr("width", 500)
                .attr("height", 300);
            const xScale = d3
                .scaleBand()
                .domain(data.map((_, i) => i.toString()))
                .range([0, 500])
                .padding(0.1);

            const yScale = d3
                .scaleLinear()
                .domain([0, d3.max(data) ?? 0])
                .range([300, 0]);

            svg.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr(
                    "class",
                    "fill-blue-500 hover:fill-blue-600 transition-colors"
                )
                .attr("x", (_, i) => xScale(i.toString())!)
                .attr("y", (d) => yScale(d))
                .attr("width", xScale.bandwidth())
                .attr("height", (d) => 300 - yScale(d));

            const xAxis = d3
                .axisBottom(xScale)
                .tickFormat((d) => `#${Number(d) + 1}`);
            const yAxis = d3.axisLeft(yScale);

            svg.append("g")
                .attr("transform", `translate(0,${300})`)
                .call(xAxis)
                .selectAll("text")
                .attr("class", "text-xs text-gray-600"); // Tailwind classes

            svg.append("g")
                .call(yAxis)
                .selectAll("text")
                .attr("class", "text-xs text-gray-600"); // Tailwind classes
        }
    }, []);

    return (
        <svg
            ref={ref}
            className="mx-auto my-4 shadow-md rounded-lg"
        />
    );
};

export default BarChartComponent;
