import { Loader } from "lucide-react";
import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    loadingText?: React.ReactNode;
    spinnerPlacement?: "start" | "end";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            loading = false,
            loadingText,
            spinnerPlacement = "start",
            children,
            ...rest
        },
        ref
    ) => {
        return (
            <button
                className="bg-blue-400 flex gap-2 px-4 py-3 rounded cursor-pointer 
                           hover:bg-blue-500 text-white font-normal disabled:bg-gray-300"
                ref={ref}
                disabled={loading || rest.disabled}
                {...rest}>
                {loading && spinnerPlacement === "start" && (
                    <Loader
                        size={18}
                        fill="red"
                        className="animate-spin"
                    />
                )}
                {loading && loadingText ? loadingText : children}
                {loading && spinnerPlacement === "end" && (
                    <Loader
                        size={18}
                        fill="red"
                        className="animate-spin"
                    />
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
