import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

type Positions = "top" | "bottom" | "left" | "right";

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    position?: Positions;
}

const Tooltip: React.FC<TooltipProps> = ({
    content,
    children,
    position = "top",
}) => {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const calculatePosition = () => {
        if (tooltipRef.current && triggerRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            const space = {
                top: triggerRect.top,
                bottom: window.innerHeight - triggerRect.bottom,
                left: triggerRect.left,
                right: window.innerWidth - triggerRect.right,
            };

            let newPosition = position;
            if (
                space[position] <
                (position === "left" || position === "right"
                    ? tooltipRect.width
                    : tooltipRect.height)
            ) {
                const positions = [
                    { pos: "top", space: space.top },
                    { pos: "bottom", space: space.bottom },
                    { pos: "left", space: space.left },
                    { pos: "right", space: space.right },
                ];

                positions.sort((a, b) => b.space - a.space);
                newPosition = positions[0].pos as typeof position;
            }

            const positionsCoords = {
                top: {
                    left:
                        triggerRect.left +
                        triggerRect.width / 2 -
                        tooltipRect.width / 2,
                    top: triggerRect.top - tooltipRect.height - 8,
                },
                bottom: {
                    left:
                        triggerRect.left +
                        triggerRect.width / 2 -
                        tooltipRect.width / 2,
                    top: triggerRect.bottom + 8,
                },
                left: {
                    left: triggerRect.left - tooltipRect.width - 8,
                    top:
                        triggerRect.top +
                        triggerRect.height / 2 -
                        tooltipRect.height / 2,
                },
                right: {
                    left: triggerRect.right + 8,
                    top:
                        triggerRect.top +
                        triggerRect.height / 2 -
                        tooltipRect.height / 2,
                },
            };

            setCoords(positionsCoords[newPosition]);
        }
    };

    useEffect(() => {
        if (visible) {
            calculatePosition();
            window.addEventListener("resize", calculatePosition);
            window.addEventListener("scroll", calculatePosition, true);
        }

        return () => {
            window.removeEventListener("resize", calculatePosition);
            window.removeEventListener("scroll", calculatePosition, true);
        };
    }, [visible, position]);

    return (
        <>
            <div
                className="flex items-center"
                ref={triggerRef}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}>
                {children}
            </div>

            {visible &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        style={{
                            top: coords.top,
                            left: coords.left,
                            zIndex: 9999,
                        }}
                        className="fixed whitespace-nowrap rounded-md bg-gray-700 px-2 py-1 text-sm text-white shadow-lg">
                        {content}
                    </div>,
                    document.body
                )}
        </>
    );
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
