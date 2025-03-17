import React from "react";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    container?: boolean;
    spacing?: number;
    size?: number;
    children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({
    container,
    spacing,
    size,
    children,
    className = "",
    ...rest
}) => {
    let computedClass = className ? className + " " : "";

    if (container) {
        computedClass += "grid grid-cols-12 ";
        if (spacing !== undefined) {
            computedClass += `gap-${spacing} `;
        }
    }

    if (size !== undefined) {
        computedClass += `col-span-${size} `;
    }

    return (
        <div
            className={computedClass.trim()}
            {...rest}>
            {children}
        </div>
    );
};

Grid.displayName = "Grid";

export default Grid;
