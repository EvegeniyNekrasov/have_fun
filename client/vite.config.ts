import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    ],
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
