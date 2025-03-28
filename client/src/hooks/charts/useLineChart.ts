import { useEffect } from "react";
import * as d3 from "d3";

interface LineChartConfig {
    data: number[];
    svgRef: React.RefObject<SVGSVGElement | null>;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export const useLineChart = ({
    data,
    svgRef,
    containerRef,
}: LineChartConfig) => {
    useEffect(() => {
        const svg = svgRef.current;
        const container = containerRef.current;

        if (!svg || !container) return;

        const renderChart = () => {
            const rect = container.getBoundingClientRect();
            const containerWidth = rect.width;
            const containerHeight = rect.height;
            const margin = { top: 20, right: 20, bottom: 50, left: 40 };
            const width = containerWidth - margin.left - margin.right;
            const height = containerHeight - margin.top - margin.bottom;

            d3.select(svg).selectAll("*").remove();

            const chart = d3
                .select(svg)
                .attr("width", containerWidth)
                .attr("height", containerHeight)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            const xScale = create_x_scale(data, width);
            const yScale = create_y_scale(data, height);

            draw_line(chart, data, xScale, yScale);
            draw_axes(chart, xScale, yScale, height, data);
            draw_dots(chart, data, xScale, yScale);
        };

        const resizeObserver = new ResizeObserver(renderChart);
        resizeObserver.observe(container);

        renderChart();
        return () => resizeObserver.disconnect();
    }, [data, svgRef, containerRef]);
};

/**
 * Creates a D3 linear scale function for the x-axis of a line chart.
 *
 * This function generates a scaling function that maps data indices to horizontal
 * position coordinates on the chart. The domain is set from 0 to the last index
 * of the provided data array, and the range is set from 0 to the specified width.
 *
 * @param data - Array of numeric values used to determine the domain of the scale
 * @param width - The width of the chart area in pixels that defines the output range
 * @returns A D3 linear scale function for positioning elements along the x-axis
 *
 * @example
 * // Example usage:
 * const xScale = create_x_scale([10, 45, 30, 25], 500);
 */
function create_x_scale(data: number[], width: number) {
    return d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([0, width]);
}

/**
 * Creates a D3 linear scale function for the y-axis of a line chart.
 *
 * This function generates a scaling function that maps data values to vertical
 * position coordinates on the chart. The domain is set from 0 to the maximum value
 * in the provided data array, and the range is set from the specified height to 0
 * (inverted to account for SVG coordinate system where 0 is at the top).
 *
 * @param data - Array of numeric values used to determine the domain of the scale
 * @param height - The height of the chart area in pixels that defines the output range
 * @returns A D3 linear scale function for positioning elements along the y-axis
 *
 * @example
 * // Example usage:
 * const yScale = create_y_scale([10, 45, 30, 25], 300);
 */
function create_y_scale(data: number[], height: number) {
    return d3
        .scaleLinear()
        .domain([0, d3.max(data) as number])
        .range([height, 0]);
}

/**
 * Renders a continous line connecting data points on a chart.
 *
 * This function creates a smooth line that connects all data points using D3 line generator.
 * The line is drawn as an SVG path element with specified styling for visual representation
 * of data trends.
 *
 * @param chart - D3 selection of the SVG group element where the line will be appended
 * @param data - Array of numeric values to be connected by the line
 * @param xScale - D3 linear scale function that maps data indices to x-coordinates
 * @param yScale - D3 linear scale function that maps data values to y-coordinates
 *
 * @example
 * // Example usage:
 * draw_line(chartSelection, [10, 20, 30, 40], xScale, yScale);
 */
function draw_line(
    chart: d3.Selection<SVGGElement, unknown, null, undefined>,
    data: number[],
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>
) {
    const lineGenerator = d3
        .line<number>()
        .x((_, i) => xScale(i))
        .y((d) => yScale(d))
        .curve(d3.curveMonotoneX);

    chart
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#1f77b4")
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);
}

/**
 * Renders x and y axes on a line chart.
 *
 * This function creates and appends axes to a chart using the provided scaling functions.
 * The x-axis is positioned at the bottom of the chart and displays sequential numbering.
 * The y-axis is positioned at the left side of the chart to display data value ranges.
 * Both axes are styled with appropriate text formatting.
 *
 * @param chart - D3 selection of the SVG group element where axes will be appended
 * @param xScale - D3 linear scale function that maps data indices to x-coordinates
 * @param yScale - D3 linear scale function that maps data values to y-coordinates
 * @param height - The height of the chart area in pixels (used for x-axis positioning)
 * @param data - Array of numeric values used to determine appropriate tick counts
 *
 * @example
 * // Example usage:
 * draw_axes(chartSelection, xScale, yScale, 300, [10, 45, 30, 25]);
 */
function draw_axes(
    chart: d3.Selection<SVGGElement, unknown, null, undefined>,
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>,
    height: number,
    data: number[]
) {
    const xAxis = d3
        .axisBottom(xScale)
        .ticks(data.length)
        .tickFormat((_, i) => `#${i + 1}`);
    const yAxis = d3.axisLeft(yScale);

    chart
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll("text")
        .attr("class", "text-xs text-bray-500");

    chart
        .append("g")
        .call(yAxis)
        .selectAll("text")
        .attr("class", "text-xs text-gray-600");
}

/**
 * Render circular data points (dots) on a line chart at each data point position.
 *
 * This function adds circle SVG elements to represent individual data points on the chart.
 * Each cirlce is positioned according to the provided scaling functions and style with
 * a consistent appearence.
 *
 * @param chart - D3 selection of SVG group element where dots will be appended
 * @param data - Array of numeric values to be represented as dots
 * @param xScale - D3 linear scale function that maps data indices to x-coordinates
 * @param yScale - D3 linear scale function that maps data values to y-coordinates
 *
 * @example
 * // Example useage
 * draw_dots(chartSection, [10, 20, 30, 40], xScale, yScale);
 */
function draw_dots(
    chart: d3.Selection<SVGGElement, unknown, null, undefined>,
    data: number[],
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>
) {
    chart
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (_, i) => xScale(i))
        .attr("cy", (d) => yScale(d))
        .attr("r", 3)
        .attr("fill", "#ff7f0e");
}
