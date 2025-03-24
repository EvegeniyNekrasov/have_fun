import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@repositories": path.resolve(__dirname, "./src/repositories/"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@types": path.resolve(__dirname, "./src/types"),
            "@ui": path.resolve(__dirname, "./src/ui"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@utils": path.resolve(__dirname, "./utils/"),
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:6969",
                changeOrigin: false,
                secure: false,
            },
        },
    },
});
