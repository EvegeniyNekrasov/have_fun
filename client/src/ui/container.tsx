type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface CardProps {
    children: React.ReactNode;
    color?: string;
    size?: Size;
    width?: string;
    height?: string;
}

const Container: React.FC<CardProps> = ({
    children,
    color = "bg-white",
    size = "sm",
    width,
    height,
}) => {
    const sizeMap: Record<Size, { containerSize: string }> = {
        xs: { containerSize: `${color} p-2 rounded-xs` },
        sm: { containerSize: `${color} p-3 rounded-sm` },
        md: { containerSize: `${color} p-4 rounded-md` },
        lg: { containerSize: `${color} p-5 rounded-lg` },
        xl: { containerSize: `${color} p-6 rounded-xl` },
    };

    const { containerSize } = sizeMap[size] || { containerSize: "" };

    const className = `
        ${containerSize}
        ${width ? width : "w-full"}
        ${height ? height : "h-full"}
        flex flex-col gap-2 min-h-0
    `;

    return <div className={className}>{children}</div>;
};

Container.displayName = "Container";

export default Container;
