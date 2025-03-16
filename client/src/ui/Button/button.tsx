import { Loader } from "lucide-react";
import React, { forwardRef } from "react";

type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    loadingText?: React.ReactNode;
    size?: ButtonSize;
    icon?: React.ReactNode;
    iconPlacement?: "start" | "end";
    spinnerPlacement?: "start" | "end";
}

const SPINNER_PLACEMENT = Object.freeze({
    start: "start",
    end: "end",
});

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            loading = false,
            size = "md",
            spinnerPlacement = "start",
            icon,
            iconPlacement = "start",
            loadingText,
            children,
            ...rest
        },
        ref
    ) => {
        const sizeMap: Record<
            ButtonSize,
            { buttonSize: string; iconSize: number }
        > = {
            sm: { buttonSize: "text-sm px-3 py-2", iconSize: 14 }, // Small --> ideal for compact iterfaces
            md: { buttonSize: "text-base px-4 py-2", iconSize: 16 }, // Medium --> balance between space and readability
            lg: { buttonSize: "text-base px-6 py-3", iconSize: 18 }, // Large --> larger touch area, useful for mobile devices
            xl: { buttonSize: "text-lg px-8 py-4", iconSize: 20 }, // Extra large --> for primary actions or more spatial interfaces
        };
        const { buttonSize, iconSize } = sizeMap[size] || {
            buttonSize: "text-base",
            iconSize: 14,
        };

        const className = `
            ${buttonSize}
            ${!loading ? "cursor-pointer" : "cursor-progress"} 
          bg-indigo-400 flex rounded items-center gap-2  
          hover:bg-indigo-500 text-white font-normal disabled:bg-indigo-200
        `;

        return (
            <button
                className={className}
                ref={ref}
                disabled={loading || rest.disabled}
                {...rest}>
                {loading && spinnerPlacement === SPINNER_PLACEMENT.start && (
                    <Loader
                        size={iconSize}
                        color="white"
                        className="animate-spin"
                    />
                )}
                {!loading && icon && iconPlacement === "start" && icon}
                {loading && loadingText ? loadingText : children}
                {!loading && icon && iconPlacement === "end" && icon}
                {loading && spinnerPlacement === SPINNER_PLACEMENT.end && (
                    <Loader
                        size={iconSize}
                        color="white"
                        className="animate-spin"
                    />
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
