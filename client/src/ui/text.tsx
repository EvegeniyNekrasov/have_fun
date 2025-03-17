type Size = "sm" | "md" | "lg" | "xl" | "xxl";

interface TextProps {
    size?: Size;
    label: string;
}

const Text = ({ size = "md", label }: TextProps) => {
    const sizeMap: Record<Size, { textSize: string }> = {
        sm: { textSize: "text-sm" },
        md: { textSize: "text-base" },
        lg: { textSize: "text-lg" },
        xl: { textSize: "text-xl" },
        xxl: { textSize: "text-2xl" },
    };

    const { textSize } = sizeMap[size] || { textSize: "" };

    const className = `
        ${textSize}
        font-sans leading-normal text-gray-900
    `;

    return <span className={className}>{label}</span>;
};

Text.displayName = "Text";

export default Text;
